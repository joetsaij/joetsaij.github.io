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
                        <label for="male">
                            <input type="radio" id="autoTimeEveryday" value="everyday" v-model="autoTime"> 每天
                        </label>
                        <label for="female">
                            <input type="radio" id="autoTimeCustom" value="custom" v-model="autoTime"> 自選
                        </label>
                    </div>
                </div>
                <div class="row" v-if="autoTime === 'custom'">
                    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                        <div class="form-group">
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
                        <button class="btn btn-warning" @click.prevent="reset">重新設定
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

export default {
    data: function () {
        const config = JSON.parse(localStorage.getItem('config'));
        return {
            autoOrder: config && config.autoOrder || false, // 自製開關 component
            autoTime: config && config.autoTime || 'everyday',
            autoDays: config && config.autoDays || [], //checkbox必須要用 array 去接它，Vue會自動記錄已勾選的值
            message: '海南雞飯讚啦!',
        }
    },
    methods: {
        submitted: function () {
            const config = {
                autoOrder: this.autoOrder,
                autoTime: this.autoTime,
                autoDays: this.autoDays,
            };
            localStorage.setItem('config', JSON.stringify(config));
        },
        reset: function () {
            this.autoTime = 'everyday';
            this.autoDays = [];
        }
    },
    components: {
        appSwitch: Switch // 也可寫成 'app-switch': Switch
    }
}
</script>

<style>

</style>
