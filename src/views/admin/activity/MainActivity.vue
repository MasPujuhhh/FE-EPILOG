<template>
    <div class="wrapper" style="display: flex; width: 100%; height: 100%">
        <!-- left -->
        <SidebarAdmin></SidebarAdmin>
        <!-- right -->
        <div style="
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 10px;
        " class="right">
            <div class="header">
                <HeaderAdmin></HeaderAdmin>
            </div>

            <!-- content -->
            <div style="
            width: 100%;
            /* min-height: 100vh; */
            height: 100%;
            display: flex;
            margin-top: 10vh;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding-left: 300px;
            /* padding-bottom: 1%; */
            gap: 20px;
          " class="container-content">

                <div class="container mt-4 p-4 rounded-3 shadow" style="background-color: #ccc;">
                    <div class="row d-flex align-items-center p-3 rounded-4" style="background-color: bisque;">
                        <h2 class="col-md-2 text-center" style="font-size: 1.8rem; font-weight: 600;">Activity</h2>
                        <div class="col-md-5">
                            <div class="form-group">
                                <label for="month">Bulan:</label>
                                <select v-model="month" class="form-control">
                                    <option value="0" selected disabled>Pilih Bulan</option>
                                    <option value="1">Januari</option>
                                    <option value="2">Februari</option>
                                    <option value="3">Maret</option>
                                    <option value="4">April</option>
                                    <option value="5">Mei</option>
                                    <option value="6">Juni</option>
                                    <option value="7">Juli</option>
                                    <option value="8">Agustus</option>
                                    <option value="9">September</option>
                                    <option value="10">Oktober</option>
                                    <option value="11">November</option>
                                    <option value="12">Desember</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="form-group">
                                <label for="year">Tahun:</label>
                                <input v-model="year" type="number" class="form-control" placeholder="Masukkan Tahun">
                            </div>
                        </div>
                    </div>

                    <table class="table table-bordered mt-3 p-3">
                        <thead>
                            <tr>
                                <th v-for="weekday in weekdays" :key="weekday">{{ weekday }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, rowIndex) in calendar" :key="rowIndex">
                                <td v-for="(data, i) in row" :key="i" @click="() => enableDaySelection(data?.date)" style="width: 80px; height: 80px; padding: 0;">
                                    <div v-if="data" style=" width: 100%; height: 100%; padding: 0.5rem;" data-bs-toggle="modal" data-bs-target="#datatanggal">
                                        <p>{{ data?.day }} </p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Modal -->
                <div class="modal fade modal-l" id="datatanggal" data-bs-backdrop="static" data-bs-keyboard="false"
                    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-2" id="staticBackdropLabel" style="padding-left: 1rem;">{{ moment(data?.date,
                                    "YYYY-MM-DD").format('LL') }}
                                </h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div v-if="data.datas?.length">
                                    <h6>Jumlah Peserta : {{ data?.total }}</h6>
                                    <h6>Jumlah Peserta Mengisi Logbook : {{ data?.attendance }}</h6>

                                    <h3>Daftar Peserta</h3>
                                    <ol class="list-group list-group-numbered">
                                        <li v-for="item in data?.datas"
                                            class="list-group-item d-flex justify-content-between align-items-start">
                                            <div class="ms-2 me-auto">
                                                <div class="fw-bold">{{ item.username }} - {{ item.fullname }}</div>
                                                {{ item.company_role }} | {{ item.company }}
                                            </div>
                                            <div v-if="item.keterangan == null">
                                                <span class="me-2"></span>
                                                <span class="bi bi-x-circle-fill" style="color: red;"></span>
                                            </div>
                                            <div v-else-if="item.keterangan == 0">
                                                <span class="me-2"></span>
                                                <span class="bi bi-check-circle-fill" style="color: green;"></span>
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                                <div v-else>Schedule not Created</div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{Close}</button>
                                <button v-if="!data.datas?.length" type="button" class="btn btn-primary"
                                    @click="() => openSchedule(data?.date)">Open
                                    Schedule</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- content end -->

        </div>
    </div>
</template>
  

<script setup>
import SidebarAdmin from "../../../components/SidebarAdmin.vue";
import HeaderAdmin from "../../../components/HeaderAdmin.vue";
import { onMounted, ref, watch, watchEffect } from "vue";
import axios from "axios";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
import { routerKey, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import moment from "moment";
import 'moment/locale/id'  // without this line it didn't work
// moment.locale('id')
// moment.updateLocale('id', null);
// console.log(moment(new Date))



const store = useCounterStore();
const { id_varian } = storeToRefs(store);
const { simpanIdVarian } = store;

const router = useRouter();
const endpoint = import.meta.env.VITE_ENDPOINT;
let token = localStorage.getItem("token");

const weekdays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const calendar = ref([]);

let month = ref('');
let year = ref('');
let data = ref([])

const enableDaySelection = async (date) => {
    if (date) {
        try {
            let schedule = await axios.get(`${endpoint}/schedule/getScheduleByDate/${date}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            let hasil_schedule = schedule.data?.data
            let total = hasil_schedule.length

            let attendance = 0
            if (hasil_schedule) {
                for (const key in hasil_schedule) {
                    if (hasil_schedule[key].status != 0) {
                        attendance += 1
                    }
                }
            }
            data.value = {
                date,
                attendance,
                total,
                datas: hasil_schedule
            }
        } catch (error) {
            data.value = error
        }
    }
};

const openSchedule = async (date) => {
    let x = {
        date
    }
    try {
        let res = await axios.post(`${endpoint}/schedule`, x, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        // console.log(res.data)
        const pesan = res.data?.status;
        toast.success(pesan, { autoClose: 2000 });
        setTimeout(() => {
            location.reload();
        }, 1500);
    } catch (error) {
        // const pesan = res.data?.status;
        console.log(error)
        toast.error(error.response.data.message, { autoClose: 2000 });
    }
}

const clearCalendar = () => {
    calendar.value = [];
};

const getFirstDayIndex = (month, year) => {
    const firstDay = new Date(year, month - 1, 1);
    return firstDay.getDay();
};

const createCalendar = async () => {
    const totalDays = new Date(year.value, month.value, 0).getDate();
    const firstDayIndex = getFirstDayIndex(month.value, year.value);

    let panjang = firstDayIndex >= 5 && totalDays == 31 ? 6 : 5
    // Menambahkan baris pada tabel kalender
    for (let i = 0; i < panjang; i++) {
        const row = [];
        for (let j = 0; j < 7; j++) {
            const currentDay = i * 7 + j - firstDayIndex + 1;
            if (currentDay > 0 && currentDay <= totalDays) {
                const date = `${year.value}-${month.value}-${currentDay}`
                // const date = `${year.value}-${month.value}-${year.value}`
                row.push({ date, day: currentDay });
            } else {
                row.push(null);
            }
        }
        calendar.value.push(row);
    }
};

// console.log(calendar)

onMounted(() => {
    const currentDate = new Date();
    month.value = currentDate.getMonth() + 1;  // Bulan dimulai dari 0
    year.value = currentDate.getFullYear();
    createCalendar();
});

watchEffect(() => {
    clearCalendar();
    createCalendar();
});
</script>

  
<style scoped>
.content td {
    font-size: 16px;
    font-weight: bold;
}

.content tr:hover {
    background-color: aquamarine !important;
}
</style>
  