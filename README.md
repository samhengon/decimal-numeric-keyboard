## decimal-numeric-keyboard
基于 vue 封装的一个自定义数字键盘 + 输入框.

## why?
1. 刚开始选用 input type = tel, 发现移动端没有办法输入小数
2. 换成 input type = text, 发现唤起的键盘不是数字键盘
3. 最终选择 input type = number, 又发现验证规则有部分实现不了

## 效果
![效果](https://i.loli.net/2017/07/12/5965aee99a4c9.gif)

## 更新
后来我想了下, 可以通过监听键盘点击事件, 然后拿到输入值的 keyCode 从而进行值的验证.
但是这样缺少一个自定义的输入框, 输入框无法实现类似大众点评那般. 

## 感谢
[xwpongithub/better-keyboard](https://github.com/xwpongithub/better-keyboard)

[helicopters/wc-keyboard]
(https://github.com/helicopters/wc-keyboard)

## 使用方法
```shell
npm i decimal-numeric-keyboard --save
```
```javascript
import KeyBoard from 'decimal-numeric-keyboard'
import 'decimal-numeric-keyboard/style.css'
Vue.use(Keyboard);

```

```html
<decimal-numeric-keyboard
	v-model="value"   // 输入框的值
	inter="5"         // 限制整数位数
	decimal="2"       // 小数位数
	placeholder="询问服务员后输入"
	:allowLeadingZero="false"	// Keep zeros in front of the inputted value. NOTE: use with decimal="0"
	label="消费金额"
	currencylabel="HKD"	// Currency Label shown in front of the inputted value />
```
