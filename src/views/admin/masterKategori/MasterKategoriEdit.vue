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
          <h2 style="font-weight: bold; font-size: 30px">Master Kategori</h2>
        </div>
        <!-- header end -->
        <!-- table -->
        <div
          style="
            width: 90%;
            min-height: 40vh;
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
          <!-- form -->
          <div
            style="
              width: 98%;
              height: 96%;
              background-color: #f8f9fa;
              border-radius: 15px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              gap: 10px;
            "
            class="outer-table"
          >
            <div
              style="
                width: 100%;
                height: 60px;
                display: flex;
                padding-left: 20px;
                align-items: center;
                border-top-right-radius: 10px;
                border-top-left-radius: 10px;
                background-color: #f8f9fa;
                box-shadow: 0rem 0.2rem 0.3rem rgba(0, 0, 0, 0.4);
              "
              class="header-form"
            >
              <h2 style="font-weight: bold">Edit Kategori</h2>
            </div>
            <!-- form content -->
            <table class="table table-borderless table-hover table-light">
              <tbody>
                <tr>
                  <!-- nama kategori -->
                  <td width="200px">Nama Kategori</td>
                  <td width="20px">:</td>
                  <td>
                    <input
                      v-model="namaKategori"
                      type="text"
                      class="form-control"
                      id="namaProduk"
                      aria-describedby="emailHelp"
                      :placeholder="kategori.nama_kategori"
                    />
                  </td>
                </tr>
                <tr>
                  <!-- gambar kategori -->
                  <td width="200px">Gambar kategori</td>
                  <td width="20px">:</td>
                  <td>
                    <input
                      @change="getFile"
                      type="file"
                      class="form-control"
                      id="gambarProduk"
                      aria-describedby="emailHelp"
                      :placeholder="kategori.gambar_kategori"
                    />
                  </td>
                  <!-- gambar produk end -->
                </tr>

                <tr>
                  <!-- button -->
                  <td width="200px" colspan="3">
                    <div
                      style="display: flex; flex-direction: row-reverse"
                      class="button"
                    >
                      <button
                        v-if="busy == false"
                        @click="editKategori"
                        type="button"
                        class="btn btn-success"
                      >
                        <i class="bi bi-plus"></i>
                        Save Changes
                      </button>
                      <button
                        v-else-if="busy == true"
                        @click="editKategori"
                        type="button"
                        class="btn btn-success"
                        disabled
                      >
                        <div class="spinner-border text-light" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </button>
                    </div>
                  </td>
                  <!-- button end -->
                </tr>
              </tbody>
            </table>
            <!-- form content end -->
          </div>
          <!-- form end -->
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

  const store = useCounterStore();
  const { id_kategori } = storeToRefs(store);
  const { simpanIdUsers } = store;

  const router = useRouter();

  let busy = ref(false);

  // let produk = ref([]);
  let kategori = ref({});
  let varian = ref([]);
  let valid = localStorage.getItem("token");
  // let valid = ref("");

  let namaKategori = ref("");
  let gambar = ref(null);

  const endpoint = import.meta.env.VITE_ENDPOINT;

  watch(kategori, (newValue, oldValue) => {
    // console.log(newValue);
    namaKategori.value = kategori.value.nama_kategori;
    gambar.value = kategori.value.gambar_kategori;
  });
  const getFile = async (event) => {
    gambar.value = event.target.files[0];
  };

  const viewCategory = async () => {
    try {
      let res = await axios.get(`${endpoint}/kategori/${id_kategori.value}`, {
        headers: {
          Authorization: `Bearer ${valid}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data?.data;
      kategori.value = data;
      // console.log(data);
      //   console.log(res);
      // console.log(kategori.value);
    } catch (error) {
      console.log(error);
    }
  };

  const editKategori = async () => {
    busy.value = !busy.value;
    try {
      const formData = new FormData();
      formData.append("nama_kategori", namaKategori.value);
      formData.append("gambar_kategori", gambar.value);

      console.log(...formData);

      if (!namaKategori.value || !gambar.value) {
        toast.error("Form harus diisi!", {
          autoClose: 2000,
        });
      } else {
        let res = await axios.put(
          `${endpoint}/kategori/${id_kategori.value}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${valid}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const pesan = res.data?.status;

        toast.success(pesan, {
          autoClose: 2000,
        });
        setTimeout(() => {
          busy.value = !busy.value;
          router.push({ path: "/master/kategori" });
        }, 1500);
      }
      //   console.log(res);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        busy.value = !busy.value;
      }, 1500);
    }
  };

  onMounted(() => {
    viewCategory();
  });
</script>

<style scoped>
  td {
    font-size: 20px;
    font-weight: bold;
  }
</style>
