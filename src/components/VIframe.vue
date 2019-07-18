<template>
    <iframe :src="srcAsync"></iframe>
</template>
<script>
export default {
    name: 'VIframe',
    props: {
        src: {
            type: String,
            required: true
        }
    },
    data(){
        return {
            srcAsync: ''
        }
    },
    mounted(){
        setTimeout(()=>{
            this.srcAsync = this.src
        }, 5000)
    }
}
</script>
