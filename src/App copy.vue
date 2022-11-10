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
                    <app-switch v-model="dataSwitch"></app-switch>
                </div>
            </div>
            <div v-if="dataSwitch">
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
                        <label for="message">Message</label><br>
                        <!-- Interpolation between <textarea>{{ test }}</textarea> doesn't work!-->
                        <textarea id="message" rows="5" class="form-control" v-model="message"></textarea>
                    </div>
                </div>
                <div class="row" v-if="0">
                    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 from-group">
                        <label for="priority">Priority</label>
                        <select id="priority" class="form-control" v-model="selectedPriority">
                            <!-- option的預設選項，請使用 v-bind:selected="判斷式"，還記得 v-bind:attribute="判斷式"的用法嗎？ -->
                            <!-- 但是 option 中的預設值會被 select 中的雙向綁定值給覆蓋掉！合理！直覺！ -->
                            <option v-for="(priority, index) in priorities" :key="index"
                                :selected="priority == 'Medium'">
                                {{ priority }} </option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                        <button class="btn btn-primary" @click.prevent="submitted">Submit!
                            <!-- 用 prevent 是不希望點了按鈕後真的送出表單，而是希望交由 vue 去處理事件 -->
                        </button>
                        <button class="btn btn-warning" @click.prevent="reset">Reset!
                            <!-- 用 prevent 是不希望點了按鈕後真的送出表單，而是希望交由 vue 去處理事件 -->
                        </button>
                    </div>
                </div>
                <div class="row" v-if="0">
                    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                        <div class="form-group">
                            <label for="email">Mail</label>
                            <input type="text" id="email" class="form-control" v-model.lazy="userData.email">
                            <!-- v-model雙向綁定預設會監聽任何的key stroke，只要欄位有變動就會馬上反應到data上！若不想讓他那麼『即時』，可以加上modifier: lazy，讓他在onblur時才反應 -->
                            <!-- v-model 在 input 上其實是透過實作 v-bind:value 及 @input 事件來做到雙向綁定 -->
                            <input type="text" id="email" class="form-control" :value="userData.email"
                                @input="userData.email = $event.target.value">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" class="form-control" v-model.lazy="userData.password">
                        </div>
                        <div class="form-group">
                            <label for="age">Age</label>
                            <input type="number" id="age" class="form-control" v-model.lazy.number="userData.age">
                            <!-- 此處的modifier: number 會強制將資料轉換成 number -->
                        </div>

                    </div>
                </div>
            </div>
        </form>
        <div class="row" v-if="isSubmit">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4>Your Data</h4>
                    </div>
                    <div class="panel-body">
                        <p>Mail: {{ userData.email }} </p>
                        <p>Password: {{ userData.password }} </p>
                        <p>Age: {{ userData.age }} </p>
                        <!-- 如何讓 textarea 中的換行動作保留？可以套用style="white-space: pre"來達到 -->
                        <p style="white-space: pre">Message: {{ message }}</p>
                        <p><strong>Send Mail?</strong></p>
                        <ul>
                            <li v-for="(item, idx) in sendMail" :key="idx">{{ item }}</li>
                        </ul>
                        <p>Gender: {{ gender }}</p>
                        <p>Priority: {{ selectedPriority }}</p>
                        <p>Switched: {{ dataSwitch }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Switch from "./Switch.vue";

export default {
    data: function () {
        return {
            autoTime: 'everyday',
            autoDays: [],
            userData: {
                email: '',
                password: '',
                age: 41
            },
            message: 'A new text',
            sendMail: [], //checkbox必須要用 array 去接它，Vue會自動記錄已勾選的值
            gender: 'Male', // radio button
            selectedPriority: 'High', // select 值
            priorities: ['High', 'Medium', 'Low'], // select options
            dataSwitch: false, // 自製開關 component
            isSubmit: false
        }
    },
    methods: {
        submitted: function () { // 也可以寫成 submitted() {}
            this.isSubmit = true;
        },
        reset: function () {
            this.userData.email = '';
            this.userData.password = '';
            this.userData.age = 41;

            this.message = '';
            this.sendMail = [];
            this.gender = 'Male';
            this.selectedPriority = '';
            this.dataSwitch = 'On';

            this.isSubmit = false;
        }
    },
    components: {
        appSwitch: Switch // 也可寫成 'app-switch': Switch
    }
}
</script>

<style>

</style>
