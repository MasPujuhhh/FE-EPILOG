<template>
  <header>
    <Navbar></Navbar>
  </header>
  <main>
    <!-- pembungkus -->
    <div
      style="
        width: 90%;
        height: 700px;
        margin-top: 100px;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.4);
        background-color: white;
        border-radius: 15px;
      "
      class="container-fluid"
    >
      <!-- tabel -->

      <div style="width: 100%; height: 10%">
        <h1 style="color: black; width: 25%">Profile</h1>
      </div>
      <figure
        style="display: flex; align-items: center; gap: 40px"
        class="figure"
      >
        <img
          src="../../components/icons/profile.png"
          style="width: 200px; height: 200px; margin-top: 30px"
          class="figure-img img-fluid rounded"
          alt="..."
        />
        <div style="display: flex; flex-direction: column" class="text-figur">
          <h3>
            {{ `${user.nama_depan} ${user.nama_belakang}` || "Nama User" }}
          </h3>
          <h5>{{ user.alamat || "Alamat" }}</h5>
        </div>
      </figure>
      <div
        style="display: flex; flex-direction: column; flex-wrap: wrap; gap: 5px"
        class="form-container"
      >
        <form class="row g-3">
          <div class="col-md-6">
            <label for="inputEmail4" class="form-label">Email</label>
            <input
              v-model="email"
              type="text"
              class="form-control"
              id="inputEmail"
              :placeholder="user.email || 'Silahkan isi Email'"
            />
          </div>
          <div class="col-md-6">
            <label for="inputPassword4" class="form-label">Username</label>
            <input
              v-model="username"
              type="text"
              class="form-control"
              id="inputPassword"
              placeholder="Username"
            />
          </div>
          <div class="col-md-6">
            <label for="inputEmail4" class="form-label">First Name</label>
            <input
              v-model="firstName"
              type="text"
              class="form-control"
              id="inputFirstName"
              :placeholder="user.nama_depan || 'SIlahkan Isi Nama Depan'"
            />
          </div>
          <div class="col-md-6">
            <label for="inputPassword4" class="form-label">Last Name</label>
            <input
              v-model="lastName"
              type="text"
              class="form-control"
              id="inputLastName"
              :placeholder="user.nama_belakang || 'SIlahkan Isi Nama Belakang'"
            />
          </div>
          <div class="col-md-6">
            <label for="inputEmail4" class="form-label">No Telepon</label>
            <input
              v-model="noTelp"
              type="text"
              class="form-control"
              id="inputNoTelepon"
              :placeholder="user.no_telepon || 'SIlahkan Isi No Telepon'"
            />
          </div>
          <div class="col-md-6">
            <label for="inputPassword4" class="form-label">Alamat</label>
            <input
              v-model="alamat"
              type="text"
              class="form-control"
              id="inputalamat"
              :placeholder="user.alamat || 'SIlahkan Isi Alamat'"
            />
          </div>
          <div class="col-12">
            <button
              style="width: 20%"
              v-if="busy == false"
              type="button"
              @click="save"
              class="btn btn-primary"
            >
              Save Changes
            </button>
            <button
              style="width: 20%"
              v-else-if="busy == true"
              type="button"
              class="btn btn-primary"
              disabled
            >
              <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
  import Navbar from "@/components/Navbar.vue";
  import { onMounted, ref, watch } from "vue";
  import axios from "axios";
  import { useCounterStore } from "@/stores/counter";
  import { storeToRefs } from "pinia";
  import { routerKey, useRouter } from "vue-router";
  import { toast } from "vue3-toastify";
  import "vue3-toastify/dist/index.css";

  const store = useCounterStore();
  const { data_user, token } = storeToRefs(store);

  const router = useRouter();
  let user = ref({});
  let valid = localStorage.getItem("tokenUser");
  let idUser = localStorage.getItem("idUser");

  let busy = ref(false);

  const email = ref("" || user.value.email);
  const password = ref("" || user.value.password);
  const firstName = ref("" || user.value.nama_depan);
  const lastName = ref("" || user.value.nama_belakang);
  const noTelp = ref("" || user.value.no_telepon);
  const alamat = ref("" || user.value.alamat);

  const endpoint = import.meta.env.VITE_ENDPOINT;
  // console.log(data_user.value);
  // console.log(user.value);
  // console.log(token.value);
  watch(
    user,
    (newValue, oldValue) => {
      email.value = user.value.email;
      password.value = user.value.password;
      firstName.value = user.value.nama_depan;
      lastName.value = user.value.nama_belakang;
      noTelp.value = user.value.no_telepon;
      alamat.value = user.value.alamat;
    },
    { deep: true }
  );

  const viewProfile = async () => {
    try {
      let res = await axios.get(`${endpoint}/user/${idUser}`, {
        headers: {
          Authorization: `Bearer ${valid}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data.data;
      user.value = data;
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const save = async () => {
    busy.value = !busy.value;
    try {
      let x = {
        email: email.value,
        // password: password.value,
        nama_depan: firstName.value,
        nama_belakang: lastName.value,
        no_telepon: noTelp.value,
        alamat: alamat.value,
      };

      // console.log(token.value);
      let res = await axios.put(`${endpoint}/user/${idUser}`, x, {
        headers: {
          Authorization: `Bearer ${valid}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data?.data;
      const pesan = res.data?.status;

      toast.success(pesan, { autoClose: 2000 });
      setTimeout(() => {
        busy.value = !busy.value;
        router.push({ path: "/" });
      }, 1500);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        busy.value = !busy.value;
      }, 1500);
    }
  };

  onMounted(() => {
    viewProfile();
  });
</script>

<style scoped>
  label {
    color: black;
    font-weight: bold;
  }
  input {
    color: gray;
  }
</style>
