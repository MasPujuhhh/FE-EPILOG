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
        ></div>
        <!-- header end -->
        <!-- table -->
        <div
          style="
            width: 90%;
            min-height: 85vh;
            height: 100%;
            display: flex;
            flex-direction: row-reverse;
            padding-top: 6%;
            gap: 20px;
            border-radius: 10px;
            margin-bottom: 10vh;
            background-color: #3887be;
          "
          class="container-table"
        >
          <!-- top -->
          <div
            style="
              min-width: 50vw;
              width: 100%;
              height: 50%;
              display: flex;
              flex-direction: column;
              gap: 20px;
              padding-left: 5%;
              padding-right: 5%;
            "
            class="right"
          >
            <div
              style="
                width: 100%;
                height: 100%;
                display: flex;
                gap: 10px;
                flex-direction: column;
              "
              class="product"
            >
              <div style="display: flex; gap: 10px" class="top-product">
                <!-- produk -->
                <div
                  @click="$router.push('/master/produk')"
                  style="
                    width: 50%;
                    min-height: 30vh;
                    height: 100%;
                    display: flex;
                    color: white;
                    background-color: #eec759;
                    border-radius: 10px;
                    box-shadow: 0rem 0.2rem 0.7rem rgba(0, 0, 0, 0.4);
                  "
                  class="container-top-left"
                >
                  <div
                    style="
                      width: 50%;
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      padding: 5%;
                      padding-left: 7%;
                    "
                    class="text"
                  >
                    <h2 style="font-size: 60px; font-weight: bold">
                      {{ produk }}
                    </h2>
                    <h3 style="font-size: 40px; font-weight: bold">Produk</h3>
                  </div>
                  <div
                    style="
                      width: 50%;
                      display: flex;
                      flex-direction: row-reverse;
                      padding: 5%;
                    "
                    class="icon"
                  >
                    <i style="font-size: 80px" class="bi bi-basket2"></i>
                  </div>
                </div>
                <!-- user -->
                <div
                  @click="$router.push('/master/user')"
                  style="
                    width: 50%;
                    min-height: 30vh;
                    height: 100%;
                    display: flex;
                    background-color: #9bb8cd;
                    border-radius: 10px;
                    box-shadow: 0rem 0.2rem 0.7rem rgba(0, 0, 0, 0.4);
                  "
                  class="container-top-right"
                >
                  <div
                    style="
                      width: 50%;
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      padding: 5%;
                      padding-left: 7%;
                    "
                    class="text"
                  >
                    <h2 style="font-size: 60px; font-weight: bold">
                      {{ user }}
                    </h2>
                    <h3 style="font-size: 40px; font-weight: bold">Users</h3>
                  </div>
                  <div
                    style="
                      width: 50%;
                      display: flex;
                      flex-direction: row-reverse;
                      padding: 5%;
                    "
                    class="icon"
                  >
                    <i style="font-size: 80px" class="bi bi-person"></i>
                  </div>
                </div>
              </div>
              <div style="display: flex; gap: 10px" class="bottom-product">
                <!-- kategori -->
                <div
                  @click="$router.push('/master/kategori')"
                  style="
                    width: 50%;
                    min-height: 30vh;
                    height: 100%;
                    display: flex;
                    background-color: #9bb8cd;
                    border-radius: 10px;
                    box-shadow: 0rem 0.2rem 0.7rem rgba(0, 0, 0, 0.4);
                  "
                  class="container-bottom-left"
                >
                  <div
                    style="
                      width: 50%;
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      padding: 5%;
                      padding-left: 7%;
                    "
                    class="text"
                  >
                    <h2 style="font-size: 60px; font-weight: bold">
                      {{ kategori }}
                    </h2>
                    <h3 style="font-size: 40px; font-weight: bold">Kategori</h3>
                  </div>
                  <div
                    style="
                      width: 50%;
                      display: flex;
                      flex-direction: row-reverse;
                      padding: 5%;
                    "
                    class="icon"
                  >
                    <i style="font-size: 80px" class="bi bi-cake2"></i>
                  </div>
                </div>
                <!-- varian -->
                <div
                  @click="$router.push('/master/varian')"
                  style="
                    width: 50%;
                    min-height: 30vh;
                    height: 100%;
                    display: flex;
                    background-color: #eec759;
                    border-radius: 10px;
                    box-shadow: 0rem 0.2rem 0.7rem rgba(0, 0, 0, 0.4);
                  "
                  class="container-bottom-right"
                >
                  <div
                    style="
                      width: 50%;
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      padding: 5%;
                      padding-left: 7%;
                    "
                    class="text"
                  >
                    <h2 style="font-size: 60px; font-weight: bold">
                      {{ varian }}
                    </h2>
                    <h3 style="font-size: 40px; font-weight: bold">Varian</h3>
                  </div>
                  <div
                    style="
                      width: 50%;
                      display: flex;
                      flex-direction: row-reverse;
                      padding: 5%;
                    "
                    class="icon"
                  >
                    <i style="font-size: 80px" class="bi bi-columns-gap"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style="
              min-width: 50vw;
              width: 100%;
              height: 50%;
              display: flex;
              flex-direction: column;
              gap: 20px;
              padding-left: 40%;
              /* background-color: #3887be; */
            "
            class="left"
          >
            <!-- sold -->
            <div
              style="
                min-width: 40vw;
                width: 100%;
                display: flex;
                flex-direction: column;
                padding-left: 5%;
                gap: 30px;
              "
              class="transaksi"
            >
              <!-- jumlah transaksi -->
              <div
                @click="$router.push('/master/history/')"
                style="
                  width: 40%;
                  min-height: 15vh;
                  height: 100%;
                  display: flex;
                  background-color: #3887be;
                  border-radius: 10px;
                  box-shadow: 0rem 0.2rem 0.7rem rgba(0, 0, 0, 0.4);
                "
                class="container-bottom"
              >
                <div
                  style="
                    width: 50%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 5%;
                    padding-left: 7%;
                  "
                  class="text"
                >
                  <h2 style="font-size: 50px; font-weight: bold">
                    {{ terjual }}
                  </h2>
                  <h3 style="font-size: 30px; font-weight: bold">Transaksi</h3>
                </div>
                <div
                  style="
                    width: 50%;
                    display: flex;
                    flex-direction: row-reverse;
                    padding: 5%;
                  "
                  class="icon"
                >
                  <i style="font-size: 60px" class="bi bi-bag"></i>
                </div>
              </div>
              <!-- jumlah transaksi end -->
              <!-- jumlah transaksi berhasil -->
              <div
                @click="$router.push('/master/history/success')"
                style="
                  width: 40%;
                  min-height: 15vh;
                  height: 100%;
                  display: flex;
                  background-color: #65b741;
                  border-radius: 10px;
                  box-shadow: 0rem 0.2rem 0.7rem rgba(0, 0, 0, 0.4);
                "
                class="container-bottom"
              >
                <div
                  style="
                    width: 50%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 5%;
                    padding-left: 7%;
                  "
                  class="text"
                >
                  <h2 style="font-size: 50px; font-weight: bold">
                    {{ success }}
                  </h2>
                  <h3 style="font-size: 30px; font-weight: bold">
                    Transaksi Berhasil
                  </h3>
                </div>
                <div
                  style="
                    width: 50%;
                    display: flex;
                    flex-direction: row-reverse;
                    padding: 5%;
                  "
                  class="icon"
                >
                  <i style="font-size: 60px" class="bi bi-bag-check"></i>
                </div>
              </div>
              <!-- jumlah transaksi berhasil end -->
              <!-- jumlah transaksi pending -->
              <div
                @click="$router.push('/master/history/pending')"
                style="
                  width: 40%;
                  min-height: 15vh;
                  height: 100%;
                  display: flex;
                  background-color: #bf3131;
                  border-radius: 10px;
                  box-shadow: 0rem 0.2rem 0.7rem rgba(0, 0, 0, 0.4);
                "
                class="container-bottom"
              >
                <div
                  style="
                    width: 50%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 5%;
                    padding-left: 7%;
                  "
                  class="text"
                >
                  <h2 style="font-size: 50px; font-weight: bold">
                    {{ pending }}
                  </h2>
                  <h3 style="font-size: 30px; font-weight: bold">
                    Transaksi Pending
                  </h3>
                </div>
                <div
                  style="
                    width: 50%;
                    display: flex;
                    flex-direction: row-reverse;
                    padding: 5%;
                  "
                  class="icon"
                >
                  <i style="font-size: 60px" class="bi bi-bag-x"></i>
                </div>
              </div>
              <!-- jumlah transaksi pending end -->
            </div>
          </div>
        </div>
      </div>
      <!-- content end -->
    </div>
  </div>
</template>

<script setup>
  import SidebarAdmin from "../../components/SidebarAdmin.vue";
  import HeaderAdmin from "../../components/HeaderAdmin.vue";
  import { onMounted, ref, useSSRContext, watch } from "vue";
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

  let produk = ref();
  let user = ref();
  let varian = ref();
  let kategori = ref();
  let terjual = ref();
  let success = ref();
  let pending = ref();
  let valid = localStorage.getItem("token");
  let visible = ref(true);

  const endpoint = import.meta.env.VITE_ENDPOINT;

  const viewProduct = async () => {
    try {
      let res = await axios.get(`${endpoint}/produk`, {
        headers: {
          Authorization: `Bearer ${valid}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data?.data;
      // console.log(produk);
      // console.log(data);
      produk.value = data.length;
      console.log(produk.value);
    } catch (error) {
      console.log(error);
    }
  };

  const viewUser = async () => {
    try {
      let res = await axios.get(`${endpoint}/user/`, {
        headers: {
          Authorization: `Bearer ${valid}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data?.data;
      // console.log(produk);
      //   console.log(data);
      user.value = data.length;
      console.log(user.value);
    } catch (error) {
      console.log(error);
    }
  };

  const viewKategori = async () => {
    try {
      let res = await axios.get(`${endpoint}/kategori/`, {
        headers: {
          Authorization: `Bearer ${valid}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data?.data;
      kategori.value = data.length;
      console.log(kategori.value);
    } catch (error) {
      console.log(error);
    }
  };

  const viewVarian = async () => {
    try {
      let res = await axios.get(`${endpoint}/varian`, {
        headers: {
          Authorization: `Bearer ${valid}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data?.data;
      varian.value = data.length;
      // console.log(data);
      console.log(varian.value);
      // console.log(kategori.value);
    } catch (error) {
      console.log(error);
    }
  };

  const viewHistory = async () => {
    try {
      let res = await axios.get(`${endpoint}/transaksi/all`, {
        headers: {
          Authorization: `Bearer ${valid}`,
          "Content-Type": "application/json",
        },
      });

      console.log(res);

      const data = res.data?.data;

      terjual.value = data.length;

      // console.log(res);
      // console.log(item.value);
    } catch (error) {
      console.log(error);
    }
  };

  const viewSuccess = async () => {
    try {
      let res = await axios.get(`${endpoint}/transaksi/filter/1`, {
        headers: {
          Authorization: `Bearer ${valid}`,
          "Content-Type": "application/json",
        },
      });

      console.log(res);

      const data = res.data?.data;

      success.value = data.length;

      // console.log(res);
      // console.log(item.value);
    } catch (error) {
      console.log(error);
    }
  };

  const viewPending = async () => {
    try {
      let res = await axios.get(`${endpoint}/transaksi/filter/0`, {
        headers: {
          Authorization: `Bearer ${valid}`,
          "Content-Type": "application/json",
        },
      });

      console.log(res);

      const data = res.data?.data;

      pending.value = data.length;

      // console.log(res);
      // console.log(item.value);
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(() => {
    viewProduct();
    viewUser();
    viewVarian();
    viewKategori();
    viewHistory();
    viewSuccess();
    viewPending();
  });
</script>

<style scoped>
  .container-top-left {
    color: white !important;
    transition: all 0.4s ease !important;
  }
  .container-top-left:hover {
    opacity: 0.8;
    cursor: pointer;
    width: 60% !important;
  }
  .container-top-right {
    color: white !important;
    transition: all 0.4s ease !important;
  }
  .container-top-right:hover {
    opacity: 0.8;
    cursor: pointer;
    width: 60% !important;
  }
  .container-bottom-left {
    color: white !important;
    transition: all 0.4s ease !important;
  }
  .container-bottom-left:hover {
    opacity: 0.8;
    cursor: pointer;
    width: 60% !important;
  }
  .container-bottom-right {
    color: white !important;
    transition: all 0.4s ease !important;
  }
  .container-bottom-right:hover {
    opacity: 0.8;
    cursor: pointer;
    width: 60% !important;
  }
  .container-bottom {
    color: white !important;
    transition: all 0.4s ease !important;
  }
  .container-bottom:hover {
    cursor: pointer;
    opacity: 0.8 !important;
    width: 45% !important;
  }
</style>
