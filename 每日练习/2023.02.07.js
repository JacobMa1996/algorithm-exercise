// Vue实现HOC

function wrapper(wrappedComponent) {
    return {
        mounted() {

        },
        props: wrappedComponent.props,
        render(h) {
            let slots, slotKeys = Object.keys(this.$slots)
            if (slotKeys?.length) {
                slots = slotKeys.reduce((arr, key) => {
                    return arr.concat(this.slots[key], key)
                }, []).map(vnode => {
                    vnode.context = this._self
                })
            }


            return h(wrappedComponent, {
                on: this.$listeners,
                attrs: this.$attrs,
                props: this.$props,
                scopedSlots: this.$scopedSlots
            }, slots)
        }
    }
}