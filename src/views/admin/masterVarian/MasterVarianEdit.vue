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
          <h2 style="font-weight: bold; font-size: 30px">Master Varian</h2>
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
              <h2 style="font-weight: bold">Edit Varian</h2>
            </div>
            <!-- form content -->
            <table class="table table-borderless table-hover table-light">
              <tbody>
                <tr>
                  <!-- nama kategori -->
                  <td width="200px">Nama Varian</td>
                  <td width="20px">:</td>
                  <td>
                    <input
                      v-model="newVarian"
                      type="text"
                      class="form-control"
                      id="namaProduk"
                      aria-describedby="emailHelp"
                      :placeholder="varian.nama_varian"
                    />
                  </td>
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
                        @click="editVarian"
                        type="button"
                        class="btn btn-success"
                      >
                        <i class="bi bi-plus"></i>
                        Add varian
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
  const { id_varian } = storeToRefs(store);
  const { simpanIdUsers } = store;

  const router = useRouter();

  let busy = ref(false);

  let varian = ref({});
  let newVarian = ref("");

  let valid = localStorage.getItem("token");
  const endpoint = import.meta.env.VITE_ENDPOINT;
  // let valid = ref("");
  watch(varian, (newValue, oldValue) => {
    newVarian.value = varian.value.nama_varian;
    // console.log(newVarian.value, " ini watch");
  });
  const viewVarian = async () => {
    try {
      let res = await axios.get(
        `http://localhost:8001/varian/${id_varian.value}`,

        {
          headers: {
            Authorization: `Bearer ${valid}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data.data;
      varian.value = data;
      // console.log(data);
      // console.log(kategori.value);
    } catch (error) {
      console.log(error);
    }
  };

  const editVarian = async () => {
    busy.value = !busy.value;
    try {
      let x = {
        nama_varian: newVarian.value,
      };

      if (!newVarian.value) {
        toast.error("Nama Varian Harus Diisi!");
      } else {
        let res = await axios.put(`${endpoint}/varian/${id_varian.value}`, x, {
          headers: {
            Authorization: `Bearer ${valid}`,
            "Content-Type": "application/json",
          },
        });

        const data = res.data.data;
        varian.value = data;
        // console.log(data);

        const pesan = res.data.status;

        toast.success(pesan, {
          autoClose: 2000,
        });

        setTimeout(() => {
          busy.value = !busy.value;
          router.push({ path: "/master/varian" });
        }, 1500);
      }
      //   console.log(data);
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
  onMounted(() => {
    viewVarian();
  });
</script>

<style scoped>
  td {
    font-size: 20px;
    font-weight: bold;
  }
</style>
