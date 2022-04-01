import { defineComponent, onMounted, onUnmounted, ref, Teleport, h } from 'vue'

interface flyinContextMenuProps {
  to?: string,
  stopPropagation?: boolean,
  preventDefault?: boolean
}

export default defineComponent<flyinContextMenuProps>({
  props: [
    'to',
    'stopPropagation',
    'preventDefault',
  ] as unknown as undefined,
  emits: ['rightclick'],
  setup(props, { emit, slots }) {
    const showContextMenu = ref(false)
    const contextMenuPosition = ref({ top: '0', left: '0' })

    const onRightClick = (e: MouseEvent, msg: any) => {
      const { stopPropagation = false, preventDefault = true } = props
      if (preventDefault)
        e.preventDefault()
      if (stopPropagation)
        e.stopPropagation()
      showContextMenu.value = true
      contextMenuPosition.value = { top: `${e.clientX}px`, left: `${e.clientY}px` }
      emit('rightclick', msg)
    }

    const onClickOutside = () => {
      showContextMenu.value = false
    }

    onMounted(() => {
      document.addEventListener('click', onClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', onClickOutside)
    })

    return () => {
      if (slots.default && slots.contextMenu)
        return () => [
          h(Teleport, { to: props.to ?? 'body' }, [
            showContextMenu.value
              ? h('div', { style: { position: 'fixed', top: contextMenuPosition.value.top, left: contextMenuPosition.value.left } }, slots.contextMenu())
              : null
          ]),
          slots.default({ onRightClick, showContextMenu, contextMenuPosition })
        ]
    }
  }
})