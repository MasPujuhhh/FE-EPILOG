<template>
  <div
    style="
      width: 100%;
      height: 80px;
      background-color: #024d75;
      box-shadow: 0rem 0.3rem 0.3rem rgba(0, 0, 0, 0.4);
      display: flex;
      flex-direction: row-reverse;
      padding-right: 20px;
      position: fixed;
      z-index: 1;
    "
    class="header"
  >
    <div style="display: flex; align-items: center; justify-content: space-between;" class="btn-group">
      <h5
      style="color: aliceblue; font-weight: 600; font-size: 1.1rem; padding-top: 0.5rem; padding-right: 0.5rem;">{{ username }}</h5>
      <i
        style="font-size: 30px; color: aliceblue;"
        class="bi bi-person-circle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      ></i>

      <ul class="dropdown-menu">
        <li><a class="dropdown-item" @click="logout">Logout</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
import { routerKey, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const router = useRouter();


const endpoint = import.meta.env.VITE_ENDPOINT
const token = localStorage.getItem('token')
const username = ref()
// console.log(token)
const getUser = async () => {
    try {
      let res = await axios.get(`${endpoint}/user/getDataUserByToken`, { headers: { Authorization: `Bearer ${token}` } });
      const data = res.data?.data;
      username.value = data.username
      // console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

const logout = async () => {
  localStorage.clear();
  toast.success("Logout Berhasil!!", { autoClose: 2000 });
  setTimeout(() => {
    router.push({ path: "/login" });
  }, 1500);
};

onMounted(() => {
    getUser()
});


</script>
<style scoped>
.dropdown-menu li a {
  font-weight: bold;
  transition: all 0.3s ease-in;
}
.dropdown-menu li a:hover {
  font-weight: bold;
  border-radius: 5px;
  color: #fff;
  background-color: chocolate;
}
</style>
