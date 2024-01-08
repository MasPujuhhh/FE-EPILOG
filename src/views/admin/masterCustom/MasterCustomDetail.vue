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
          <h2 style="font-weight: bold; font-size: 30px">Master Custom</h2>
        </div>
        <!-- header end -->
        <!-- table -->
        <div
          style="
            width: 90%;
            min-height: 75vh;
            height: 100%;
            background-color: #d0d4ca;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
            padding-top: 1%;
            border-radius: 10px;
            box-shadow: 0rem 0.2rem 0.7rem rgba(0, 0, 0, 0.4);
          "
          class="container-table"
        >
          <div
            style="
              width: 98%;
              height: 40px;
              display: flex;
              align-items: center;
              padding-left: 20px;
              border-top-right-radius: 10px;
              border-top-left-radius: 10px;
              background-color: aliceblue;
            "
            class="container-header"
          >
            <h2 style="font-weight: bold">Detail Produk Custom</h2>
          </div>
          <div
            style="
              width: 98%;
              height: 67vh;
              background-color: aqua;
              display: flex;
              border-bottom-left-radius: 10px;
              border-bottom-right-radius: 10px;
            "
            v-for="produk in item"
            class="container-detail"
          >
            <div
              style="
                width: 50%;
                height: 100%;
                background-color: bisque;
                display: flex;
                align-items: center;
                justify-content: center;
              "
              class="photo"
            >
              <!-- photo -->
              <div
                style="
                  width: 350px;
                  height: 500px;
                  background-color: #513d34;
                  border-radius: 10px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
                class="outer-photo"
              >
                <img
                  style="width: 310px; border-radius: 10px"
                  :src="
                    'http://localhost:8001/assets/img/' + produk.gambar_produk
                  "
                  alt="my image"
                />
              </div>
            </div>
            <!-- content -->
            <div
              style="
                width: 50%;
                height: 100%;
                background-color: #a9b388;
                display: flex;
                flex-direction: column;
                gap: 10px;
                padding: 20px;
              "
              class="content"
            >
              <h2 style="font-weight: bold">{{ produk.nama_produk }}</h2>
              <p style="font-weight: bold">{{ produk.deskripsi }}</p>
              <h4 style="font-weight: bold">IDR {{ produk.harga_produk }}</h4>
              <h4 style="font-weight: bold">Stok: {{ produk.stok_produk }}</h4>
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

  const store = useCounterStore();
  const { id_produk } = storeToRefs(store);
  const { simpanIdUsers, simpanIdProduk } = store;

  const router = useRouter();

  let valid = localStorage.getItem("token");

  const endpoint = import.meta.env.VITE_ENDPOINT;

  let item = ref([]);

  const viewItems = async () => {
    try {
      let res = await axios.get(`${endpoint}/custom/${id_produk.value}`, {
        headers: {
          Authorization: `Bearer ${valid}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data?.data;
      const pesan = res.data?.pesan;

      item.value.push(data);
      // console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  // watch(token, (newValue, oldValue) => {
  //   console.log(newValue);
  //   valid.value = token.value;
  // });
  onMounted(() => {
    viewItems();
  });
</script>

<style scoped>
  td {
    font-size: 18px;
    font-weight: bold;
  }
</style>
