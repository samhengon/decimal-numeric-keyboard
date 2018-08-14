<style>
.box {
  height: 100%;
  border: 1px solid #ccc;
  height: 45px;
  padding: 10px;
  margin: 10px;
}
</style>
<template>
  <div id="aap">
    <div class="box">
       <wc-keyboard 
        placeholder="询问服务员后输入"
        label="消费金额"
        inter="5"
        decimal="2"
        :allowLeadingZero="false"
        v-model="val"
        @keyboardtouchstart="test"
        ref="price" />
    </div>
    <div class="box">
       <wc-keyboard 
        placeholder="ttg2"
        label="haha2"
        inter="5"
        decimal="0"
        :allowLeadingZero="true"
        v-model="gg"
        @keyboardtouchstart="test"
        ref="qty" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      val: "",
      gg: ""
    };
  },
  methods: {
    test(label) {
      console.log("test emit from keyboardtouchstart..." + label);
      var priceKeyboardComponent = this.$refs.price;
      var qtyKeyboardComponent = this.$refs.qty;
      if (priceKeyboardComponent.label === label)
      {
        console.log("emit from keyboardtouchstart: Price Keyboard Clicked!");
        qtyKeyboardComponent.blur();
      } else if (qtyKeyboardComponent.label === label)
      {
        console.log("emit from keyboardtouchstart: Qty Keyboard Clicked!");
        priceKeyboardComponent.blur();
      }
    }
  }
};
</script>