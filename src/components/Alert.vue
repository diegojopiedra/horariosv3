<template>
    <div class="alert">
        <modal :open="open" @close="open = false">
            <div class="card" :class="computedClasses">
                <h1 class="modal__title"><i class="fa" :class="{'fa-warning': type == 'error', 'fa-info-circle': type == 'message'}"></i> {{title}}</h1>
                <div class="modal__container" v-if="message.trim() != ''">{{message}}</div>
                <ul>
                    <li style="margin: var(--margin);" v-for="msg in list" :key="'message-' + msg">{{msg}}</li>
                </ul>
            </div>
        </modal>
    </div>
</template>
<script>
import Modal from '@/components/Modal'

export default {
    name: 'Alert',
    components: {
        Modal
    },
    props: {
        message: {
            type: String
        },
        list: {
            type: Array
        },
        title: {
            type: String,
            default: 'Mensaje'
        },
        type: {
            type: String,
            default: 'message'
        }
    },
    data () {
        return {
            open: false
        }
    },
    watch: {
        message (value) {
            this.open = value.trim() != ''
        },
        list (value) {
            this.open = value.length > 0
        }
    },
    computed: {
        computedClasses () {
            let classes = 'text-white'

            switch (this.type){
                case 'message':
                    classes += ' primary'
                    break
                case 'error': 
                    classes += ' cta'

            }

            return classes
        }
    }
}
</script>
