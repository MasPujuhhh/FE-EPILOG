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
            <h2 style="font-weight: bold; font-size: 30px">Master Sertifikat</h2>
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
                <h2 style="font-weight: bold">Tambah Certificate</h2>
              </div>
              <!-- form content -->
              <table class="table table-borderless table-hover table-light">
                <tbody>
                  <tr>
                    <!-- nama produk -->
                    <td width="200px">Judul</td>
                    <td width="20px">:</td>
                    <td>
                      <input
                        v-model="judul"
                        type="text"
                        class="form-control"
                        id="judul"
                        aria-describedby="textHelp"
                      />
                    </td>
                    <!-- nama produk end -->
                  </tr>
                  <tr>
                    <!-- kategori produk -->
                    <td width="200px">User</td>
                    <td width="20px">:</td>
                    <td>
                      <select
                        v-model="user_id"
                        class="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>Silahkan Pilih User</option>
                        <option v-for="i in users" :value="i.id">
                          <h6>
                            <!-- {{ i.email }} | {{ i.username }} <br> -->
                            {{ i.company_role }} | {{ i.email }} / {{ i.fullname }}
                          </h6>
                        </option>
                      </select>
                    </td>
                    <!-- kategori produk end -->
                  </tr>
                  <tr>
                    <!-- gambar produk -->
                    <td width="200px">File Serifikat</td>
                    <td width="20px">:</td>
                    <td>
                        <input
                        @change="getFile"
                        type="file"
                        class="form-control"
                        id="file_pdf"
                        aria-describedby="textHelp"
                        accept="application/pdf"
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
                          @click="addCertificate"
                          type="button"
                          class="btn btn-success"
                        >
                          <i class="bi bi-plus"></i>
                          Submit
                        </button>
                        <button
                          v-if="busy == true"
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
    let users = ref([]);
    let cate = ref("" || "Silahkan Pilih Kategori");
    let valid = localStorage.getItem("token");
  
    let judul = ref("");
    let user_id = ref("");
    let file_pdf = ref(null);
  
    const endpoint = import.meta.env.VITE_ENDPOINT;
    
    // let valid = ref("");
  
    const getFile = (event) => {
      file_pdf.value = event.target.files[0];
    };
  
    const viewUser = async () => {
      try {
        let res = await axios.get(`${endpoint}/user/getDataOnlyUser`, {
          headers: {
            Authorization: `Bearer ${valid}`,
            "Content-Type": "application/json",
          },
        });
  
        const data = res.data?.data;
        users.value = data;
        console.log(users)
      } catch (error) {
        console.log(error);
      }
    };
  
    // const viewVarian = async () => {
    //   try {
    //     let res = await axios.get(`${endpoint}/varian`, {
    //       headers: {
    //         Authorization: `Bearer ${valid}`,
    //         "Content-Type": "application/json",
    //       },
    //     });
  
    //     const data = res.data.data;
    //     varian.value = data;
    //     // console.log(data);
    //     // console.log(kategori.value);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
  
    const addCertificate = async () => {
    //   busy.value = !busy.value;
      try {
        const formData = new FormData();
        formData.append("title", judul.value);
        formData.append("user_id", user_id.value);
        formData.append("file_pdf", file_pdf.value);
  
  
        console.log(...formData);
        // console.log(formData);
  
        if (!judul.value) {
          toast.error("Judul Harus Diisi!", { autoClose: 2000 });
        } else if (!user_id.value) {
          toast.error("User Harus Diisi!", { autoClose: 2000 });
        } else if (!file_pdf.value) {
          toast.error("File Pdf Harus Diisi!", { autoClose: 2000 });
        }  else {
          let res = await axios.post(`${endpoint}/certificate/createCertificate`, formData, {
            headers: {
              Authorization: `Bearer ${valid}`,
              "Content-Type": "multipart/form-data",
            },
          });
  
          const pesan = res.data?.pesan;
          toast.success(pesan, { autoClose: 2000 });
          setTimeout(() => {
            // busy.value = !busy.value;
            router.push({ path: "/admin/certificate" });
          }, 1500);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.pesan, { autoClose: 2000 });
        setTimeout(() => {

        //   busy.value = !busy.value;
        }, 1500);
      }
    };
  
    // watch(token, (newValue, oldValue) => {
    //   console.log(newValue);
    //   valid.value = token.value;
    // });
    onMounted(() => {
      viewUser();
    //   viewVarian();
    });
  </script>
  
  <style scoped>
    td {
      font-size: 20px;
      font-weight: bold;
    }
  </style>
  