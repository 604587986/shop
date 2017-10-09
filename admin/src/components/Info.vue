<template>
    <div class="infomation">
        infomation
        <line-chart :chart-data="datacollection"></line-chart>
        <button @click="fillData()">Randomize</button>
    </div>
</template>

<script>
import LineChart from 'js/LineChart.js'

export default {
    name: 'Info',
    data() {
        return {
            datacollection: ''
        }
    },
    methods: {
        fillData() {
            this.datacollection = {
                labels: [this.getRandomInt(), this.getRandomInt()],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [this.getRandomInt(), this.getRandomInt()]
                    }, {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [this.getRandomInt(), this.getRandomInt()]
                    }
                ]
            }
        },
        getRandomInt() {
            return Math.floor(Math.random() * (50 - 5 + 1)) + 5
        }
    },
    components: {
        LineChart
    },
    mounted() {
        this.fillData()
    }
}
</script>

<style scoped>
.infomation {
    max-width: 600px;
    margin: 150px auto;
}
</style>
