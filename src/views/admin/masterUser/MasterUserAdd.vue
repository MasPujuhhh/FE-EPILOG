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
            <h2 style="font-weight: bold; font-size: 30px">Master User</h2>
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
                <h2 style="font-weight: bold">Create User</h2>
              </div>
              <!-- form content -->
              <table class="table table-borderless table-hover table-light">
                <tbody>
                  <tr>
                    <td width="200px">Username</td>
                    <td width="20px">:</td>
                    <td>
                      <input
                        v-model="username"
                        type="text"
                        class="form-control"
                        id="username"
                        aria-describedby="textHelp"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td width="200px">Email</td>
                    <td width="20px">:</td>
                    <td>
                      <input
                        v-model="email"
                        type="text"
                        class="form-control"
                        id="email"
                        aria-describedby="textHelp"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td width="200px">Password</td>
                    <td width="20px">:</td>
                    <td>
                      <input
                        v-model="password"
                        type="text"
                        class="form-control"
                        id="password"
                        aria-describedby="textHelp"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td width="200px">Role User</td>
                    <td width="20px">:</td>
                    <td>
                      <select
                        v-model="company_role"
                        class="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>Silahkan Pilih Role</option>
                        <!-- <option v-for="i in kategori" :value="i.id">
                          {{ i.nama_kategori }}
                        </option> -->
                        <!-- <option :value="BE">BE</option>
                        <option :value="FE">FE</option>

                        <option selected>Silahkan Pilih Kategori</option> -->
                        <option v-for="i in list_company_role" :value="i">
                          {{ i }}
                        </option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td width="200px">Kantor</td>
                    <td width="20px">:</td>
                    <td>
                      <!-- <select
                        v-model="company"
                        class="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>Silahkan Pilih Kategori</option>
                        <option :value="Tangerang">Tangerang</option>
                        <option :value="Semarang">Semarang</option>
                      </select> -->
                      <select
                        v-model="company"
                        class="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>Silahkan Pilih Kategori</option>
                        <option v-for="i in list_company" :value="i">
                          {{ i }}
                        </option>
                      </select>
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
                          @click="addUser"
                          type="button"
                          class="btn btn-success"
                        >
                          <i class="bi bi-plus"></i>
                          Add User
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
    let kategori = ref([]);
    let varian = ref([]);
    let cate = ref("" || "Silahkan Pilih Kategori");
    let valid = localStorage.getItem("token");
  
    let username = ref("")
    let email = ref("")
    let password = ref("")
    let company_role = ref("")
    let company = ref("")

    let list_company = ['Semarang','Tangerang']
    let list_company_role = ['BE','FE']

    // console.log(username.value)

    let namaProduk = ref("");
    let kategoriProduk = ref("");
    let hargaProduk = ref();
    let stokProduk = ref();
    let varianProduk = ref([]);
    let varian_list = ref([]);
    let gambarProduk = ref(null);
    let deskripsiProduk = ref("");
  
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
  
    const addUser = async () => {
      // busy.value = !busy.value;
      try {
        // const formData = new FormData();
        // formData.append("username", username.value);
        // formData.append("email", email.value);
        // formData.append("company_role", company_role.value);
        // formData.append("company", company.value);
        // // formData.append("gambar_produk", gambarProduk.value);
        // // formData.append("deskripsi", deskripsiProduk.value);
        
        // // varianProduk.value.forEach((item, i) => {
        //   //   formData.append(`varian_list_id[${i}]`, item);
        //   // });
        // // console.log(username.value)
        // // console.log(email.value)
        // // console.log(company_role.value)
        // // console.log(company.value)
        // console.log(...formData);
        // console.log(formData);
        let formData = {
          username : username.value,
          email : email.value,
          password : password.value,
          company_role : company_role.value,
          company : company.value,
        }
  
        console.log(formData);

        if (!username.value) {
          toast.error("Username Harus Diisi!", { autoClose: 2000 });
        } else if (!email.value) {
          toast.error("Email Harus Diisi!", { autoClose: 2000 });
        } else if (!company_role.value) {
          toast.error("User Role Harus Diisi!", { autoClose: 2000 });
        } else if (!company.value) {
          toast.error("Kantor Produk Harus Diisi!", { autoClose: 2000 });
        } else {
          let res = await axios.post(`${endpoint}/user`, formData, {
            headers: {
              Authorization: `Bearer ${valid}`,
              "Content-Type": "application/json",
            },
          });
          const pesan = res.data?.pesan;
          toast.success(pesan, { autoClose: 2000 });
          setTimeout(() => {
            busy.value = !busy.value;
            router.push({ path: "/admin/user" });
          }, 1500);
        }
      } catch (error) {
        toast.error(`${error.response.data.pesan}`, { autoClose: 2000 });
        console.log(error);
      }
    };
  
    // watch(token, (newValue, oldValue) => {
    //   console.log(newValue);
    //   valid.value = token.value;
    // });
    onMounted(() => {
      // viewCategory();
      // viewVarian();
    });
  </script>
  
  <style scoped>
    td {
      font-size: 20px;
      font-weight: bold;
    }
  </style>
  