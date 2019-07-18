<template>
    <div class="modal hide" :class="classComputed">
        <div class="modal__overley row-s" @click="close" ref="overley">
            <div class="modal__container col xs-22 init-xs-2 md-18 init-md-4 lg-12 init-lg-7">
                <slot/>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Modal',
    props: {
        open: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        classComputed(){
            if(this.open){
                return 'modal__open'
            }
            return ''
        }
    },
    watch: {
        open(val){
            this.fixBody(val)
        }
    },
    methods:{
        fixBody(val){
            if(val){
                document.body.style.overflow = 'hidden'
            }else{
                document.body.style.overflow = 'auto'
            }
        },
        close(e){
            if(e.target == this.$refs.overley)
                this.$emit('close')
        }
    },
    mounted(){
        this.fixBody(this.open)
    }
}
</script>

<style lang="scss">
.modal{
  position: fixed;
  z-index: 999;
  width: 100%;
  top: -150vh;
  transition: .3s;
  display: block !important;
  left: 0;
}

.modal__overley{
  height: 100vh;
  width: 100%;
  background: #00000087;
  overflow-y: auto;
  font-size: .9rem;
}

.modal__container{
  align-self: center;
  max-height: 90vh;
}

.modal__open{
  top: 0;
}

.modal__title{
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
  margin: var(--margin);
}

.modal__text{
  margin-bottom: var(--margin);
  line-height: 1.3;
}

</style>

