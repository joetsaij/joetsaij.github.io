<template>
    <div>
        <div
                id="on"
                @click="switched(true)"
                :class="{active: value}">On</div>
        <div
                id="off"
                @click="switched(false)"
                :class="{active: !value}">Off</div>
    </div>
</template>

<!-- 複習child component取值與回傳值給parent component的方法：props 與 this.$emit(事件名稱, 新值)！ 但你會發現 parent component 若是用 v-model 後，自己就處理完了與 child component的雙向綁定!! -->
<script>
    export default {
        props: ['value'],
        methods: {
        switched: function(isOn) {
            this.$emit('input', isOn);
        }   
    }
    }
</script>

<style scoped>
    #on, #off {
        width: 40px;
        height: 20px;
        background-color: lightgray;
        padding: 2px;
        display: inline-block;
        margin: 10px -2px;
        box-sizing: content-box;
        cursor: pointer;
        text-align: center;
    }

    #on:hover, #on.active {
        background-color: lightgreen;
    }

    #off:hover, #off.active {
        background-color: lightcoral;
    }
</style>