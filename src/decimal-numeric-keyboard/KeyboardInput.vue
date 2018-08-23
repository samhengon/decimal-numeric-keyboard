<style scoped lang="less">
.keyboard {
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
    "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
  user-select: none;
  font-size: 16px;
  width: 100%;
}
.input-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 24px;

  .label {
    color: #333;
  }
  .step {
    display: flex;

    button {
      display: flex;
      border: 0;
      background: #ffffff;
      font-size: unset;

      span {
        display: flex;
        background: #eeeeee;
        color: #ababab;
        border-radius: 2px;
        -webkit-font-smoothing: antialiased;
        width: 100%;
        padding-left: 5px;
        padding-right: 5px;
        align-items: center;
        align-content: center;
      }
    }
  }

  .step-down {
    margin-left: 5px;

    button {
      span {
      }
      span::before {
        // content: "\2212";
        content: "\FF0D";
        // color: #ababab;
      }
    }
  }
  .step-up {
    margin-left: auto;

    button {
      span {
      }
      span::before {
        // content: "\002B";
        content: "\FF0B";
        // color: #ababab;
      }
    }
  }

  .content {
    display: flex;
    margin-left: auto;

    .input {
      font-size: 20px;
      color: #313131;
    }
    .cursor {
      background-color: #4788c5;
      width: 2px;
      margin-left: 2px;
    }
    .placeholder {
      color: #ccc;
    }
    .currency {
      color: #c1c1c1;
    }
  }
}
</style>
<template>
	<div class="keyboard">
		<!-- 自定义输入框 -->
		<div class="input-box" @touchstart.stop.prevent="focus">
			<!-- 左侧标签 -->
			<p class="label">{{label}} : </p>
      <div class="step step-down" v-if="showStepButton">
        <button @touchstart.stop.prevent="stepdown">
          <span></span>
        </button>
      </div>
			<!-- 右侧内容 -->
			<div class="content">
				<p class="input">
					<span class="currency" v-show="value">{{currencylabel}}</span>
					{{value}}
				</p>
				<p class="placeholder" v-show="value.length === 0">
					{{placeholder}}
				</p>
				<!-- 光标 -->
				<p class="cursor" :style="{visibility: cursor ? 'visible' : 'hidden'}"></p>
			</div>
      <div class="step step-up" v-if="showStepButton">
        <button @touchstart.stop.prevent="stepup">
          <span></span>
        </button>
      </div>
		</div>
    <slot></slot>
		<!-- 自定义键盘 -->
		<keyboard 
			:show="keyboard"
			:showDecimal=showDecimalKey
			@typing="typing"
			@complete="blur"/>
	</div>

</template>
<script>
import keyboard from "./keyboard";
export default {
  name: "KeyboardInput",
  components: {
    keyboard
  },
  created() {
    document.addEventListener("touchstart", () => {
      this.blur();
    });
  },
  props: {
    value: "",
    inter: {
      default: 5
    },
    decimal: {
      default: 2
    },
    label: {
      default: "消费金额"
    },
    currencylabel: {
      default: ""
    },
    placeholder: {
      default: "询问服务员后输入"
    },
    allowLeadingZero: {
      default: false
    },
    stepSize: {
      default: 0
    },
    showStepButton: {
      default: false
    }
  },
  data() {
    return {
      cursor: false,
      keyboard: false,
      /*value 在组件中的值*/
      newVal: "",
      aIllegal: [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "0..",
        "."
      ],
      cursorDuration: 600,
      bodyHeight: "",
      bodyOverflow: ""
    };
  },
  computed: {
    showDecimalKey: function() {
      return this.decimal > 0;
    }
  },
  methods: {
    /*focus*/
    focus() {
      this.$emit("keyboardtouchstart", this.label);
      /*显示键盘*/
      this.showKeyboard();
      /*显示光标*/
      this.showCursor();
      /*闪烁光标*/
      this.blinkCursor();
    },
    blinkCursor() {
      clearInterval(this.intervalID);
      this.intervalID = setInterval(() => {
        this.cursor = !this.cursor;
      }, this.cursorDuration);
    },
    unblinkCursor() {
      clearInterval(this.intervalID);
    },
    /*blur*/
    blur() {
      /*隐藏光标*/
      this.hideCursor();
      /*停止光标闪烁*/
      this.unblinkCursor();
      /*隐藏键盘*/
      this.hideKeyboard();
      /*
					附加 00, 如果用户输入了一个以 . 结尾的值就点完成了, 
					那么这个时候就在后面加上00
				*/
      this.toCompletion();
      /*通知父组件, 老子值出来了*/
      /*
					校验用户输入的金额是不是为 0, 如果是的话, 直接重置
				*/
      this.checkValue();
      this.notify();

      this.$emit("keyboardblur", this.label);
    },
    showKeyboard() {
      this.keyboard = true;
    },
    hideKeyboard() {
      this.keyboard = false;
    },
    showCursor() {
      this.cursor = true;
    },
    hideCursor() {
      this.cursor = false;
    },
    checkValue() {
      if (parseFloat(this.newVal) === 0) {
        this.newVal = "";
      }
    },
    /*判读是否需要加0*/
    toCompletion() {
      let list = this.newVal.split(".");
      if (typeof list[1] === "undefined") {
        if (this.newVal !== "" && this.decimal > 0) {
          this.newVal = this.newVal + ".";
          this.completion(this.decimal);
        }
      } else {
        if (list[1].length < this.decimal) {
          this.completion(this.decimal - list[1].length);
        }
      }
    },
    completion(len) {
      let v = "";
      for (let i = 0; i < len; i++) {
        v = v + "0";
      }
      this.newVal = this.newVal + v;
    },
    notify() {
      this.$emit("input", this.newVal);
    },
    del() {
      /*删除值并不会触发值的校验, 所以需要手动再触发一次*/
      this.newVal = this.newVal.slice(0, -1);
      this.notify();
    },
    /*输入*/
    typing(typedValue) {
      /*如果是点击删除*/
      if (typedValue === "") {
        this.del();
        return;
      }
      /*保存旧的值*/
      let oldValue = this.value;
      /* 20180810 added by SamHengOn: add '0' when clicked '.', if old value is empty */
      if (
        oldValue === "" &&
        typedValue === "." &&
        this.allowLeadingZero === false
      ) {
        this.newVal = "0";
      }
      /* end 20180810 added by SamHengOn */

      /*获取新的值*/
      /* 
					20180814 added by SamHengOn: 
					remove '0' if current value only have '0' and click 1-9 
				*/
      if (
        oldValue === "0" &&
        ["1", "2", "3", "4", "5", "6", "7", "8", "9"].indexOf(typedValue) >
          -1 &&
        this.allowLeadingZero === false
      ) {
        this.newVal = typedValue;
      } else {
        this.newVal = oldValue + typedValue;
      }
      /* end 20180814 added by SamHengOn */

      /*检验新值, 如果没有通过检测, 恢复值*/
      if (!this.passCheck(this.newVal)) {
        this.newVal = oldValue;
        return;
      }
      /*为了让外界同步输入, 需要发送事件*/
      this.notify();
    },
    passCheck(checkVal) {
      /*验证规则*/
      let aRules = [this.illegalInput, this.illegalValue, this.accuracy];
      return aRules.every(item => {
        return item(checkVal);
      });
    },
    illegalInput(checkVal) {
      if (
        (this.aIllegal.indexOf(checkVal) > -1 && !this.allowLeadingZero) ||
        (".".indexOf(checkVal) > -1 && this.allowLeadingZero)
      ) {
        return false;
      }
      return true;
    },
    /*非法值*/
    illegalValue(checkVal) {
      if (parseFloat(checkVal) != checkVal) {
        return false;
      }
      return true;
    },
    /*验证精度*/
    accuracy(checkVal) {
      let v = checkVal.split(".");
      if (v[0].length > this.inter) {
        return false;
      }
      if (v[1] && v[1].length > this.decimal) {
        return false;
      }
      return true;
    },
    stepup() {
      const resultVal = parseFloat(this.newVal) + parseFloat(this.stepSize);
      console.log(resultVal + " " + isNaN(resultVal));
      if (isNaN(resultVal)) {
        this.newVal = this.stepSize.toString();
      } else {
        this.newVal = resultVal.toString();
      }
      this.notify();
      this.blur();
    },
    stepdown() {
      const resultVal = parseFloat(this.newVal) - parseFloat(this.stepSize);
      console.log(resultVal + " " + isNaN(resultVal));
      if (isNaN(resultVal)) {
        this.newVal = "0";
      } else {
        this.newVal = resultVal.toString();
      }
      this.notify();
      this.blur();
    }
  },
  watch: {
    // resync the component "value" (for v-model) to local data newVal
    value: function(val, oldVal) {
      this.newVal = val;
    }
  }
};
</script>