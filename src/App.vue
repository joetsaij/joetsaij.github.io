<template>
    <div class="container">
        <form>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <h1>MM自動點餐設定</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 form-group">
                    <label>是否啟用自動點餐</label><br>
                    <app-switch v-model="autoOrder"></app-switch>
                </div>
            </div>
            <div v-if="autoOrder">
                <div class="row">
                    <!-- 對 Radio button而言，只要你用 v-model綁定到同一個 data上，Vue會自動幫你把同一個 v-model的 radio視為同一個 group處理掉，不需要像傳統html要自己設定 name -->
                    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 form-group">
                        <label>自動點餐時間</label><br>
                        <label for="autoTimeEveryday">
                            <input type="radio" id="autoTimeEveryday" value="everyday" v-model="autoTime"> 每天
                        </label>
                        <label for="autoTimeCustom">
                            <input type="radio" id="autoTimeCustom" value="custom" v-model="autoTime"> 自選
                        </label>
                    </div>
                </div>
                <div class="row" v-if="autoTime === 'custom'">
                    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                        <div class="form-group">
                            <label>一星期中的哪幾天</label><br>
                            <label for="mon">
                                <input type="checkbox" id="mon" value="mon" v-model="autoDays"> Mon
                            </label>
                            <label for="tue">
                                <input type="checkbox" id="tue" value="tue" v-model="autoDays"> Tue
                            </label>
                            <label for="wed">
                                <input type="checkbox" id="wed" value="wed" v-model="autoDays"> Wed
                            </label>
                            <label for="thu">
                                <input type="checkbox" id="thu" value="thu" v-model="autoDays"> Thu
                            </label>
                            <label for="fri">
                                <input type="checkbox" id="fri" value="fri" v-model="autoDays"> Fri
                            </label>
                        </div>

                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 form-group">
                        <label>點餐日剛好遇到在家工作</label><br>
                        <label for="mmWarning">
                            <input type="radio" id="mmWarning" value="mmWarning" v-model="whenWfh"> MM警示訊息
                        </label>
                        <label for="autoCancel">
                            <input type="radio" id="autoCancel" value="autoCancel" v-model="whenWfh"> 自動取消訂餐
                        </label>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 from-group">
                        <label for="autoMode">自動點餐模式</label>
                        <select id="autoMode" class="form-control" v-model="autoMode">
                            <!-- option的預設選項，請使用 v-bind:selected="判斷式"，還記得 v-bind:attribute="判斷式"的用法嗎？ -->
                            <!-- 但是 option 中的預設值會被 select 中的雙向綁定值給覆蓋掉！合理！直覺！ -->
                            <option v-for="(mode, index) in autoModes" :key="index" :selected="mode == '最多人點'">
                                {{ mode }} </option>
                        </select>
                    </div>
                </div>
                <div class="row" v-if="autoMode === '我要自己訂預算'">
                    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                        <div class="form-group">
                            <!-- 此處的modifier: number 會強制將資料轉換成 number -->
                            <label for="lowLimit">價格下限</label>
                            <input type="number" id="lowLimit" class="form-control" v-model.number="lowLimit">
                            <label for="highLimit">價格上限</label>
                            <input type="number" id="highLimit" class="form-control" v-model.number="highLimit">
                        </div>

                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 form-group">
                        <label for="message">意見回饋</label><br>
                        <!-- Interpolation between <textarea>{{ test }}</textarea> doesn't work!-->
                        <textarea id="message" rows="5" class="form-control" v-model="message"></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                        <button class="btn btn-primary" @click.prevent="submitted">儲存設定
                            <!-- 用 prevent 是不希望點了按鈕後真的送出表單，而是希望交由 vue 去處理事件 -->
                        </button>
                        <button class="btn btn-warning" @click.prevent="reset">回到預設
                            <!-- 用 prevent 是不希望點了按鈕後真的送出表單，而是希望交由 vue 去處理事件 -->
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import Switch from "./Switch.vue";


// 最多人點的 => 熱門餐點!
// 最便宜的 => 拮据點餐
// 最昂貴的 => 奢華套餐
// 評價最高的 => 人人推薦!
// 跟上次一樣的 => 老樣子!
// 跟上次不一樣的 => 換換口味!
// 隨機選取 => 給我點驚喜 ~

export default {
    data: function () {
        const config = JSON.parse(localStorage.getItem('config'));
        return {
            autoOrder: config && config.autoOrder || false, // 自製開關 component
            autoTime: config && config.autoTime || 'everyday',
            autoDays: config && config.autoDays || [], //checkbox必須要用 array 去接它，Vue會自動記錄已勾選的值
            whenWfh: config && config.whenWfh || 'mmWarning',
            autoMode: config && config.autoMode || '最多人點',
            autoModes: ['熱門餐點!', '拮据點餐', '奢華套餐', '人人推薦!', '老樣子!', '換換口味!', '給我點驚喜 ~', '我要自己訂預算'],
            lowLimit: config && config.lowLimit || 0,
            highLimit: config && config.highLimit || 150,
            message: config && config.message || '海南雞飯讚啦!',
        }
    },
    methods: {
        submitted: function () {
            const config = {
                autoOrder: this.autoOrder,
                autoTime: this.autoTime,
                autoDays: this.autoDays,
                autoMode: this.autoMode,
                whenWfh: this.whenWfh,
            };
            localStorage.setItem('config', JSON.stringify(config));
            this.$toast.open({
                message: "設定儲存成功",
                type: "success",
                duration: 2000,
                dismissible: true,
                position: 'top',
            });
        },
        reset: function () {
            this.autoTime = 'everyday';
            this.autoDays = [];
            this.autoMode = '熱門餐點!';
            this.whenWfh = 'mmWarning';

            this.$toast.open({
                message: "回到預設值",
                type: "info",
                duration: 2000,
                dismissible: true,
                position: 'top',
            });
        }
    },
    components: {
        appSwitch: Switch // 也可寫成 'app-switch': Switch
    }
}
</script>

<style>

</style>
