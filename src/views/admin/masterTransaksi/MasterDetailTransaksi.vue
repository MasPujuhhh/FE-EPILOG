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
        <div
          style="
            width: 85%;
            min-height: 100vh;
            height: 100%;
            display: flex;
            border-radius: 20px;
            padding: 0;
            margin-top: 5vh;
            margin-bottom: 5vh;
            /* background-color: purple; */
            box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.4);
          "
          class="container-fluid"
        >
          <!-- transaction section -->
          <div style="width: 60%; height: 100%" class="container-transaksi">
            <!-- header transaction -->
            <div
              style="
                width: 100%;
                min-height: 10vh;
                height: 10%;
                display: flex;
                align-items: center;
                padding: 10px;
                justify-content: space-between;
                border-bottom: 1px solid rgba(0, 0, 0, 0.4);
              "
              class="container-header"
            >
              <h2 style="font-weight: bolder">Detail Transaksi</h2>
              <h6>{{ cart.length }} Items</h6>
            </div>

            <!-- body transaction -->
            <div
              style="
                width: 100%;
                height: 90%;
                display: flex;
                padding: 10px;
                justify-content: center;
                /* align-items: center; */
              "
              class="container-body"
            >
              <!-- content transaction -->
              <table class="table table-hover align-middle">
                <tbody>
                  <tr v-for="produk in cart">
                    <td style="width: 200px">
                      <img
                        :src="
                          'http://localhost:8001/assets/img/' +
                          produk.gambar_produk
                        "
                        alt="my image"
                        style="width: 80px"
                      />
                    </td>
                    <td style="width: 300px">
                      <div
                        style="
                          display: flex;
                          flex-direction: column;
                          padding-top: 25px;
                        "
                        class="brand"
                      >
                        <h6>{{ produk.nama_kategori }}</h6>
                        <h3>{{ produk.nama_produk }}</h3>
                      </div>
                    </td>
                    <!-- jumlah -->
                    <td style="padding-top: 50px; width: 100px">
                      <h6>{{ produk.jumlah_produk }}</h6>
                    </td>
                    <!-- harga -->
                    <td>
                      <div style="padding-top: 45px" class="price">
                        <h6>IDR {{ produk.total_harga }}</h6>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Summary Section -->
          <div
            style="
              width: 40%;
              min-height: 90vh;
              /* height: 100%; */
              display: flex;
              flex-direction: column;
              background-color: #f3f3f3;
              /* gap: 30px; */
              border-top-right-radius: 20px;
              border-bottom-right-radius: 20px;
            "
            class="container-summary"
          >
            <!-- summary header section -->
            <div
              style="
                width: 100%;
                min-height: 10vh;
                /* background-color: #f3f3f3; */
                display: flex;
                align-items: center;
                padding-left: 10px;
                border-top-right-radius: 20px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.4);
              "
              class="summary-header"
            >
              <h2 style="font-weight: bolder">Summary</h2>
            </div>
            <!-- summary content -->
            <div
              style="
                min-height: 90vh;
                height: 100%;
                display: flex;
                flex-direction: column;
                /* background-color: #f3f3f3; */
                gap: 40px;
                border-bottom-right-radius: 20px;
              "
              class="summary-content"
            >
              <!-- total pembelian -->
              <div
                style="
                  min-height: 10vh;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding-left: 10px;
                  padding-right: 10px;
                "
                class="content-total"
              >
                <h6>ITEMS {{ cart.length }}</h6>
                <h6>IDR {{ totalHargaItem }}</h6>
              </div>
              <!-- metode pengiriman/pembayaran -->
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  /* background-color: #f3f3f3; */
                  padding: 10px;
                  border-top: 1px solid rgba(0, 0, 0, 0.4);
                  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
                "
                class="content-payment"
              >
                <form style="display: flex; flex-direction: column; gap: 30px">
                  <!-- pembayaran -->
                  <div class="mb-3">
                    <h5>Customer</h5>
                    <h6>{{ cus }}</h6>
                  </div>
                  <!-- kode promo -->
                  <div class="mb-3">
                    <h5>Tanggal Pesanan</h5>
                    <h6>{{ tanggal }}</h6>
                  </div>
                </form>
              </div>
              <!-- total pembayaran -->
              <div
                style="
                  height: 50px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding-left: 10px;
                  padding-right: 10px;
                "
                class="content-total"
              >
                <h6>TOTAL PRICE</h6>
                <h6>IDR {{ totalHargaItem }}</h6>
              </div>
              <div
                style="padding-left: 10px; border-bottom-right-radius: 20px"
                class="content-checkout"
              >
                <h5>Status Pembayaran:</h5>
                <button
                  v-if="status != 0"
                  style="
                    background-color: #157046;
                    color: #fff;
                    font-weight: bold;
                  "
                  type="button"
                  class="btn btn-success"
                >
                  Success
                </button>
                <button
                  v-else-if="status == 0"
                  style="color: #fff; font-weight: bold"
                  type="button"
                  class="btn btn-danger"
                >
                  Pending
                </button>
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
  import { onMounted, ref, watch } from "vue";
  import axios from "axios";
  import { useCounterStore } from "@/stores/counter";
  import { storeToRefs } from "pinia";
  import { routerKey, useRouter } from "vue-router";
  import { toast } from "vue3-toastify";
  import "vue3-toastify/dist/index.css";
  import moment from "moment";
  import "moment/locale/id";

  moment.locale("id-ID");

  const store = useCounterStore();
  const { id_transaksi, data_transaksi } = storeToRefs(store);
  const { simpanIdTransaksi, simpanDataTransaksi } = store;

  const router = useRouter();

  let cart = ref([]);
  let item = ref("");
  let totalHargaItem = ref("");
  let total = ref("");
  let yes = ref([]);
  let list_pId = ref([]);
  let cus = ref("");
  let tanggal = ref("");
  let status = ref(null);

  let visible = ref(false);

  let valid = localStorage.getItem("token");

  const endpoint = import.meta.env.VITE_ENDPOINT;

  const viewDetail = async () => {
    try {
      console.log(id_transaksi.value, "ininn detail");
      // console.log(yes.value, "inni box");
      let res = await axios.get(
        `${endpoint}/transaksi/detailAdmin/${id_transaksi.value}`,
        {
          headers: {
            Authorization: `Bearer ${valid}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      const data = res.data.data;
      let harga = 0;
      let current = data[0].tanggal_pesanan;
      const date = moment(current).format("LLL");
      cus.value = `${data[0].nama_depan} ${data[0].nama_belakang}`;
      tanggal.value = date;
      status.value = data[0].status_pembayaran;
      // console.log(res);

      for (let i = 0; i < data.length; i++) {
        cart.value.push(data[i]);
        // list_pId.value.push(data[i].id);
        harga += Number(data[i].total_harga);
      }

      totalHargaItem.value = harga;
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(() => {
    viewDetail();
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
