<style>
.box {
  height: 100%;
  /* border: 1px solid #ccc; */
  outline: 0.05rem solid #eee;
  outline-offset: 0.2rem;
  /* height: 45px; */
  padding: 10px;
  margin: 10px;
}
.keyboard-padding {
  display: block;
  height: 250px;
}
.input-slot {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}
</style>
<template>
  <div id="aap">
    <div class="box" id="price-keyboard-div">
       <decimal-numeric-keyboard 
        placeholder="询问服务员后输入"
        label="消费金额"
        inter="5"
        decimal="2"
        stepSize="0.01"
        :allowLeadingZero="false"
        :showStepButton="true"
        v-model="expense"
        @keyboardtouchstart="test"
        @keyboardblur="HidePadding"
        ref="price">
        <slot><i class="input-slot">Hello Slot!</i></slot>
       </decimal-numeric-keyboard>
    </div>
    <div class="box" id="qty-keyboard-div">
       <decimal-numeric-keyboard 
        placeholder="ttg2"
        label="haha2"
        inter="5"
        decimal="0"
        stepSize="400"
        :allowLeadingZero="false"
        :showStepButton="true"
        v-model="gg"
        @keyboardtouchstart="test"
        @keyboardblur="HidePadding"
        ref="qty" />
    </div>
    <div class="keyboard-padding" v-show="isKeyboardShown"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      expense: "",
      gg: "",
      isKeyboardShown: false
    };
  },
  methods: {
    test(label) {
      console.log("test emit from keyboardtouchstart..." + label);
      var priceKeyboardComponent = this.$refs.price;
      var qtyKeyboardComponent = this.$refs.qty;
      if (priceKeyboardComponent.label === label) {
        console.log("emit from keyboardtouchstart: Price Keyboard Clicked!");
        qtyKeyboardComponent.blur();
        this.isKeyboardShown = true;
        this.$nextTick(() =>
          document.getElementById("price-keyboard-div").scrollIntoView()
        );
      } else if (qtyKeyboardComponent.label === label) {
        console.log("emit from keyboardtouchstart: Qty Keyboard Clicked!");
        priceKeyboardComponent.blur();
        this.isKeyboardShown = true;
        this.$nextTick(() =>
          document.getElementById("qty-keyboard-div").scrollIntoView()
        );
      }
    },
    HidePadding(label) {
      this.isKeyboardShown = false;
    }
  }
};
</script>