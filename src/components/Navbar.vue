<template>
  <!-- navigasi section -->
  <nav
    style="
      opacity: 0.9;
      background-color: var(--secondary-color);
      height: 60px;
      top: 0;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
      position: fixed;
      width: 100%;
      z-index: 99;
    "
    class="navbar navbar-expand-xl navbar-dark"
  >
    <div class="container-fluid" style="width: 100%">
      <div
        class="collapse navbar-collapse d-flex justify-content-between mx-4"
        id="navbarSupportedContent"
      >
        <a href="/" style="font-weight: 700"
          ><span style="color: #4a1d1f; font-weight: 700"></span>EPILOG</a
        >
        <ul
          class="navbar-nav d-flex justify-content-between"
          style="width: 30%"
        >
          <li class="nav-item">
            <!-- <a class="nav-link" @click=""></a> -->
          </li>
          <li class="nav-item">
            <!-- <a class="nav-link" href=""></a> -->
          </li>
          <li class="nav-item">
            <!-- <a class="nav-link" href=""></a> -->
          </li>
          <li class="nav-item">
            <!-- <a class="nav-link" @click=""></a> -->
          </li>
        </ul>
        <form class="d-flex gap-4" role="search">
          <i
            style="font-size: 30px"
            class="bi bi-activity"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >  activity</i>
          <ul style="position: absolute; left: 83%" class="dropdown-menu">
            <li><a class="dropdown-item" @click="logbook">Loogbook</a></li>
            <li><a class="dropdown-item" @click="todo">To-do</a></li>
            <li><a class="dropdown-item" @click="announcement">Announcement</a></li>
          </ul>
        </form>
        
        <form class="d-flex gap-4" role="search">
          <!-- <a @click="pindahChat"><i class="bi bi-chat-dots"></i></a> -->
          
          <i
            style="font-size: 30px"
            class="bi bi-person"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >  {{ username }}</i>
          <!-- <p >{{ username }}</p> -->          
          <ul style="position: absolute; left: 90%" class="dropdown-menu">
            <li><a class="dropdown-item" @click="pindahProfile">Profile</a></li> 
            <li><a class="dropdown-item" @click="logout">Logout</a></li>
          </ul>
          <!-- <a @click="pindahCart"><i class="bi bi-cart3"></i></a> -->
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import { onMounted, ref, watch } from "vue";
  import axios from "axios";
  import { useCounterStore } from "@/stores/counter";
  import { storeToRefs } from "pinia";
  import { routerKey, useRouter } from "vue-router";
  import { toast } from "vue3-toastify";
  import "vue3-toastify/dist/index.css";

  const store = useCounterStore();
  // const { token } = storeToRefs(store);
  const { simpanKategori } = store;
  const username = ref()

  let kategori = ref({});
  let valid = localStorage.getItem("tokenUser");
  let endpoint = import.meta.env.VITE_ENDPOINT;

  const router = useRouter();

  let token = localStorage.getItem("tokenUser");

  const getUser = async () => {
    try {
      let res = await axios.get(`${endpoint}/user/getDataUserByToken`, { headers: { Authorization: `Bearer ${valid}` } });
      const data = res.data?.data;
      username.value = data.username
      // console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const pindahProfile = async () => {
    try {
      router.push({ path: "/profile" });
    } catch (error) {
      console.log(error);
    }
  };

  const logbook = async () => {
    try {
      router.push({ path: "/logbook" });
    } catch (error) {
      console.log(error);
    }
  };

  const todo = async () => {
    try {
      router.push({ path: "/todo" });
    } catch (error) {
      console.log(error);
    }
  };

  const announcement = async () => {
    try {
      router.push({ path: "/announcement" });
    } catch (error) {
      console.log(error);
    }
  };

  const pindahHistori = async () => {
    try {
      router.push({ path: "/history" });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    localStorage.clear();
    toast.success("Logout Berhasil!!", { autoClose: 2000 });
    setTimeout(() => {
      router.push({ path: "/login" });
    }, 1500);
  };

  watch(
    token,
    (newValue, oldValue) => {
      valid.value = token.value;
      console.log(valid, "ini watch");
    },
    { deep: true }
  );

  onMounted(() => {
    getUser()
  });
</script>

<style scoped>
  .nav-item {
    height: 100% !important;
    width: 100% !important;
  }

  .nav-item a {
    font-size: 1.1rem;
    text-align: center;
    transition: all 0.3s ease-in !important;
    font-weight: 700;
    cursor: pointer;
    color: var(--bg-color);
  }

  a {
    text-decoration: none;
    color: var(--bg-color);
    font-size: 1.6rem;
    font-weight: 700;
  }

  .nav-item a:hover {
    color: #7f675c;
  }

  .navbar-login {
    font-size: 1.1rem;
    font-weight: 700;
    transition: all 0.3s ease-in;
  }

  .navbar-login:hover {
    opacity: 0.7;
  }

  a i {
    transition: all 0.3s ease-in-out;
  }

  a i:hover {
    color: #7f675c;
  }

  .dropdown-menu li a {
    font-size: 16px;
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
