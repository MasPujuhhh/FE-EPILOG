<template>
  <div class="wrapper" style="display: flex; width: 100%; height: 100%">
    <!-- left -->
    <SidebarAdmin></SidebarAdmin>
    <!-- right -->
    <div
      style="
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
      "
      class="right"
    >
      <div class="header">
        <HeaderAdmin></HeaderAdmin>
      </div>

      <!-- content -->
      <div
        style="
          width: 100%;
          min-height: 100vh;
          height: 100%;
          display: flex;
          margin-top: 10vh;
          flex-direction: column;
          align-items: center;
          padding-left: 300px;
          padding-bottom: 1%;
          gap: 20px;
        "
        class="container-content"
      >
        <!-- header -->
        <div
          style="
            width: 100%;
            min-height: 9vh;
            height: 20%;
            display: flex;
            align-items: center;
            padding-left: 20px;
          "
          class="content-header"
        >
          <h2 style="font-weight: bold; font-size: 30px">Master History</h2>
        </div>
        <!-- header end -->
        <!-- table -->
        <div
          style="
            width: 90%;
            min-height: 85vh;
            height: 100%;
            background-color: #d0d4ca;
            display: flex;
            flex-direction: column;
            padding-top: 1%;
            align-items: center;
            gap: 10px;
            border-radius: 10px;
            box-shadow: 0rem 0.2rem 0.7rem rgba(0, 0, 0, 0.4);
          "
          class="container-table"
        >
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 98%;
              height: 10%;
              padding-left: 20px;
              padding-right: 20px;
            "
            class="table-header"
          >
            <h4 style="font-weight: bold">Data History</h4>
            <!--tambah disini note dari faizal  -->
            <div style="display: flex; gap: 5px" class="button">
              <button
                @click="$router.push('/master/history')"
                style="font-weight: bold"
                type="button"
                class="btn btn-sm btn-secondary"
              >
                Both
              </button>
              <button
                @click="$router.push('/master/history/pending')"
                style="background-color: red; color: #fff; font-weight: bold"
                type="button"
                class="btn btn-sm"
              >
                Pending
              </button>
              <button
                @click="$router.push('/master/history/success')"
                style="background-color: green; color: #fff; font-weight: bold"
                type="button"
                class="btn btn-sm"
              >
                success
              </button>
            </div>
          </div>
          <div
            style="
              width: 98%;
              height: 96%;
              display: flex;
              justify-content: center;
            "
            class="outer-table"
          >
            <div class="table-responsive">
              <!-- inner table -->
              <table class="table table-bordered table-hover align-middle">
                <thead
                  style="height: 60px; padding: 0; text-align: center"
                  class="table table-light align-middle"
                >
                  <tr>
                    <th
                      scope="col"
                      style="width: 200px; font-weight: bold; font-size: 18px"
                    >
                      ID Transaksi
                    </th>
                    <th
                      scope="col"
                      style="width: 300px; font-weight: bold; font-size: 18px"
                    >
                      Tanggal
                    </th>
                    <th
                      scope="col"
                      style="width: 200px; font-weight: bold; font-size: 18px"
                    >
                      Costumer
                    </th>
                    <th
                      scope="col"
                      style="width: 400px; font-weight: bold; font-size: 18px"
                    >
                      Harga
                    </th>
                    <th
                      scope="col"
                      style="width: 175px; font-weight: bold; font-size: 18px"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      style="width: 200px; font-weight: bold; font-size: 18px"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody style="text-align: center" class="table align-middle">
                  <tr v-for="t in item" style="height: 60px">
                    <td>{{ t.kode_transaksi }}</td>
                    <td>{{ t.tanggal_pesanan }}</td>
                    <td>{{ `${t.nama_depan} ${t.nama_belakang}` }}</td>
                    <td>{{ t.total_harga }}</td>
                    <td v-if="t.status_pembayaran == 0">
                      <button
                        style="
                          background-color: red;
                          color: #fff;
                          font-weight: bold;
                        "
                        type="button"
                        class="btn btn-sm"
                      >
                        Pending
                      </button>
                    </td>
                    <td v-else="">
                      <button
                        style="
                          background-color: #157046;
                          color: #fff;
                          font-weight: bold;
                        "
                        type="button"
                        class="btn btn-success btn-sm"
                      >
                        success
                      </button>
                    </td>
                    <td>
                      <div
                        style="display: flex; justify-content: center; gap: 5px"
                      >
                        <button
                          @click="pindahDetail(t.kode_transaksi)"
                          style="
                            box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.8);
                          "
                          type="button"
                          class="btn btn-secondary"
                        >
                          <i class="bi bi-search"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- inner table -->
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
  import { onMounted, ref, watch } from "vue";
  import axios from "axios";
  import { useCounterStore } from "@/stores/counter";
  import { storeToRefs } from "pinia";
  import { routerKey, useRouter } from "vue-router";
  import { toast } from "vue3-toastify";
  import "vue3-toastify/dist/index.css";
  import moment from "moment";
  import "moment/locale/id";

  const store = useCounterStore();
  const { id_transaksi, data_transaksi } = storeToRefs(store);
  const { simpanIdTransaksi, simpanDataTransaksi } = store;

  const router = useRouter();

  let item = ref([]);
  let valid = localStorage.getItem("token");

  const endpoint = import.meta.env.VITE_ENDPOINT;

  let visible = ref(true);

  const viewHistory = async () => {
    try {
      let res = await axios.get(`${endpoint}/transaksi/filter/0`, {
        headers: {
          Authorization: `Bearer ${valid}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data?.data;

      for (let i = 0; i < data.length; i++) {
        if (data[i].status_pembayaran == 0) {
          data[i].status_pembayaran = false;
        } else {
          data[i].status_pembayaran = true;
        }
        let date = moment(data[i].tanggal_pesanan).format("LLL");
        data[i].tanggal_pesanan = date;
        item.value.push(data[i]);
      }

      // console.log(res);
      // console.log(item.value);
    } catch (error) {
      console.log(error);
    }
  };

  const pindahDetail = async (id) => {
    try {
      console.log(id);
      await simpanIdTransaksi(id);
      router.push({ path: "/admin/transaksi/detail" });
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(() => {
    viewHistory();
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
