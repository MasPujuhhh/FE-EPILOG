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
            min-height: 79vh;
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
              <h2 style="font-weight: bold">Create Produk Custom</h2>
            </div>
            <!-- form content -->
            <table class="table table-borderless table-hover table-light">
              <tbody>
                <tr>
                  <!-- nama produk -->
                  <td width="200px">Nama Produk</td>
                  <td width="20px">:</td>
                  <td>
                    <input
                      v-model="namaProduk"
                      type="text"
                      class="form-control"
                      id="namaProduk"
                      aria-describedby="textHelp"
                    />
                  </td>
                  <!-- nama produk end -->
                </tr>
                <tr>
                  <!-- kategori produk -->
                  <td width="200px">Kategori Produk</td>
                  <td width="20px">:</td>
                  <td>
                    <select
                      v-model="kategoriProduk"
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>Silahkan Pilih Kategori</option>
                      <option v-for="i in kategori" :value="i.id">
                        {{ i.nama_kategori }}
                      </option>
                    </select>
                  </td>
                  <!-- kategori produk end -->
                </tr>
                <tr>
                  <!-- varian produk -->
                  <td width="200px">Varian Produk</td>
                  <td width="20px">:</td>
                  <td>
                    <div
                      style="display: flex; gap: 10px; flex-wrap: wrap"
                      class="option"
                    >
                      <div v-for="v in varian" class="form-check">
                        <input
                          v-model="varianProduk"
                          class="form-check-input"
                          type="checkbox"
                          :value="v.id"
                          id="defaultCheck1"
                        />
                        <label class="form-check-label" for="defaultCheck1">
                          {{ v.nama_varian }}
                        </label>
                      </div>
                    </div>
                  </td>
                  <!-- varian produk end -->
                </tr>
                <tr>
                  <!-- harga produk -->
                  <td width="200px">Harga Produk</td>
                  <td width="20px">:</td>
                  <td>
                    <input
                      v-model="hargaProduk"
                      type="number"
                      class="form-control"
                      id="hargaProduk"
                      aria-describedby="textHelp"
                    />
                  </td>
                  <!-- harga produk end -->
                </tr>
                <tr>
                  <!-- harga produk -->
                  <td width="200px">Jumlah Produk</td>
                  <td width="20px">:</td>
                  <td>
                    <input
                      v-model="stokProduk"
                      type="text"
                      class="form-control"
                      id="hargaProduk"
                      aria-describedby="textHelp"
                    />
                  </td>
                  <!-- harga produk end -->
                </tr>
                <tr>
                  <!-- stok produk -->
                  <td width="200px">Customer</td>
                  <td width="20px">:</td>
                  <td>
                    <select
                      v-model="listUser"
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>Silahkan Pilih Email User</option>
                      <option v-for="i in users" :value="i.id">
                        {{ i.email }}
                      </option>
                    </select>
                  </td>
                  <!-- stok produk end -->
                </tr>
                <tr>
                  <!-- gambar produk -->
                  <td width="200px">Gambar Produk</td>
                  <td width="20px">:</td>
                  <td>
                    <input
                      @change="getFile"
                      type="file"
                      class="form-control"
                      id="gambarProduk"
                      aria-describedby="textHelp"
                    />
                  </td>
                  <!-- gambar produk end -->
                </tr>
                <tr>
                  <!-- deskripsi produk -->
                  <td width="200px">Catatan</td>
                  <td width="20px">:</td>
                  <td>
                    <textarea
                      v-model="deskripsiProduk"
                      style="height: 200px"
                      class="form-control"
                      id="deskripsiProduk"
                      aria-describedby="textHelp"
                    ></textarea>
                  </td>
                  <!-- deskripsi produk end -->
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
                        @click="addproduk"
                        type="button"
                        class="btn btn-success"
                      >
                        <i class="bi bi-plus"></i>
                        Add Custom
                      </button>
                      <button
                        v-else-if="busy == true"
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
  const { token, id_user } = storeToRefs(store);
  const { simpanIdUsers } = store;

  const router = useRouter();

  let busy = ref(false);

  // let produk = ref([]);
  let kategori = ref([]);
  let varian = ref([]);
  let cate = ref("" || "Silahkan Pilih Kategori");
  let valid = localStorage.getItem("token");

  let namaProduk = ref("");
  let kategoriProduk = ref("");
  let hargaProduk = ref();
  let stokProduk = ref();
  let varianProduk = ref([]);
  let varian_list = ref([]);
  let gambarProduk = ref(null);
  let deskripsiProduk = ref("");
  let users = ref([]);
  let listUser = ref("");

  const endpoint = import.meta.env.VITE_ENDPOINT;
  // let valid = ref("");

  const getFile = (event) => {
    gambarProduk.value = event.target.files[0];
  };

  const viewCategory = async () => {
    try {
      let res = await axios.get(`${endpoint}/kategori`, {
        headers: {
          Authorization: `Bearer ${valid}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data?.data;
      kategori.value = data;
      // console.log(data);
      // console.log(kategori.value);
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

      const data = res.data.data;
      varian.value = data;
      // console.log(data);
      // console.log(kategori.value);
    } catch (error) {
      console.log(error);
    }
  };

  const addproduk = async () => {
    busy.value = !busy.value;
    try {
      const formData = new FormData();
      formData.append("nama_produk", namaProduk.value);
      formData.append("kategori_id", kategoriProduk.value);
      formData.append("stok_produk", stokProduk.value);
      formData.append("harga_produk", hargaProduk.value);
      formData.append("tanggal_pesanan", new Date());
      formData.append("gambar_produk", gambarProduk.value);
      formData.append("catatan", deskripsiProduk.value);
      formData.append("user_id", listUser.value);
      formData.append("deskripsi", deskripsiProduk.value);

      varianProduk.value.forEach((item, i) => {
        formData.append(`varian_list_id[${i}]`, item);
      });

      // console.log(...formData);

      if (!namaProduk.value) {
        toast.error("Nama Produk Harus Diisi!", { autoClose: 2000 });
      } else if (!kategoriProduk.value) {
        toast.error("Kategori Harus Diisi!", { autoClose: 2000 });
      } else if (!listUser.value) {
        toast.error("Stok Produk Harus Diisi!", { autoClose: 2000 });
      } else if (!hargaProduk.value) {
        toast.error("Harga Produk Harus Diisi!", { autoClose: 2000 });
      } else if (!gambarProduk.value) {
        toast.error("Gambar Produk Harus Diisi!", { autoClose: 2000 });
      } else if (!deskripsiProduk.value) {
        toast.error("Catatan Produk Harus Diisi!", { autoClose: 2000 });
      } else if (!varianProduk.value) {
        toast.error("Varian Produk Harus Diisi!", { autoClose: 2000 });
      } else {
        let res = await axios.post(`${endpoint}/custom/`, formData, {
          headers: {
            Authorization: `Bearer ${valid}`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res);

        const pesan = res.data?.pesan;
        toast.success(pesan, { autoClose: 2000 });
        setTimeout(() => {
          busy.value = !busy.value;
          router.push({ path: "/master/custom" });
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        busy.value = !busy.value;
      }, 1500);
    }
  };

  // watch(token, (newValue, oldValue) => {
  //   console.log(newValue);
  //   valid.value = token.value;
  // });

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
      for (let i = 0; i < data.length; i++) {
        users.value.push(data[i]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(() => {
    viewCategory();
    viewVarian();
    viewUser();
  });
</script>

<style scoped>
  td {
    font-size: 20px;
    font-weight: bold;
  }
</style>
