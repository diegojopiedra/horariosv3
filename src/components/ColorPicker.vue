<template>
    <div class="color-piker theme basic">
      <button class="btn color-piker__trigger" :style="'background:' + value"></button>
      <ul class="color-piker__list">
        <li class="color-piker__item" v-for="color in colors" :key="color">
          <button class="color-piker__btn" :style="'background:' + color" @click="setColor(color)"></button>
        </li>
      </ul>
    </div>
</template>
<script>
export default {
    name: 'ColorPicker',
    props:{
    value: {
      type: String
    },
    colors: {
      type: Array,
      default: ()=>{
        return [
          'var(--a)',
          'var(--h)',
          'var(--i)',
          'var(--j)',
          'var(--k)',
          'var(--l)',
          'var(--m)',
          'var(--n)',
          'var(--o)',
          'var(--p)',
          'var(--q)',
          'var(--r)',
          'var(--s)',
          'var(--t)',
          'var(--u)',
          'var(--v)',
          'var(--w)',
          'var(--x)',
          'var(--y)',
          'var(--z)',
        ]
      }
    }
  },
  methods: {
    setColor(color){
      // this.value = color
      this.$emit('input', color)
    }
  }
}
</script>
<style lang="scss">
.color-piker{
  width: 100%;
  height: 40px;
  position: relative;

  &__list{
    right: 0;
    transform-origin: top;
    transform: perspective(400px) rotateX(-90deg);
    margin-top: 5px;
    display: grid;
    grid-gap: var(--padding);

    grid-template-columns: repeat(5, 3em);

    @include break('md'){
      grid-template-columns: repeat(4, 2em);
    }
    
    background: var(--secondary);
    padding: var(--padding);
    width: fit-content;
    position: absolute;
    box-shadow: 0 0 20px rgba(0,0,0,.3);

    &::before {
      content: "";
      position: absolute;
      bottom: 100%;
      right: 24px;
      border-right: 5px solid transparent;
      border-bottom: 5px solid var(--secondary);
      border-left: 5px solid transparent;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: 100%;
      left: 0;
      width: 100%;
      height: 10px;
      background: transparent;
    }
  }

  &__trigger{
    width: 100%;
    height: 100%;

    &:hover{
      background: var(--secondary);
    }
  }

  &__trigger:focus ~ &__list,
  &__list:active{
    top: auto;
    transform: rotateX(0deg);
    transition: transform .4s;
  }

  &__item{
    height: 3em;
    @include break('md'){
      height: 2em;
    }
  }

  &__btn{
    background: var(--primary);
    width: 100%;
    height: 100%;
    transition: .3s;

    &:hover, 
    &:focus{
        transform: scale(1.2);    
        box-shadow: 0 0 20px 1px #0000009c;
    }

    &:focus{
        outline: 0;
    }
  }
}
</style>
