<template>
  <div class="badan">
    <div class="container">
      <div class="left">
        <img src="@/components/icons/logo-rapier.png" alt="" width="200" />
        <!-- <p>Happy Bakery</p> -->
      </div>
      <div class="right">
        <form @submit.prevent="signIn">
          <h3>EPILOG</h3>
          <h5>Electronic Personal</h5>
          <h5>Internship Logbook</h5>
          <div class="inputbox">
            <input v-model="username" type="text" required />
            <span>username</span>
            <i></i>
          </div>
          <div class="inputbox">
            <input v-model="password" type="password" required />
            <span>password</span>
            <i></i>
          </div>
          <button
            v-if="busy == false"
            @click="signIn"
            type="button"
            id="liveToastBtn"
          >
            Login
          </button>
          <button
            v-else-if="busy == true"
            type="button"
            id="liveToastBtn"
            disabled
          >
            <div class="spinner-border text-light" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </button>
          <!-- <div class="links">
            <h5>Forgot Password ?</h5>
            <h5 @click="$router.push('/register')">Sign Up</h5>
          </div> -->
          <!-- <div class="or">or</div>
          <button class="button">
            <a href="http://localhost:8001/auth/google">
              <span><ion-icon name="logo-google"></ion-icon></span> Sign in with
              Google
            </a>
          </button> -->
        </form>
      </div>
    </div>
    <!-- notification login success or failed -->
  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from "vue";
  import axios from "axios";
  import { useCounterStore } from "@/stores/counter";
  import { storeToRefs } from "pinia";
  import { useRouter } from "vue-router";
  import { toast } from "vue3-toastify";
  import "vue3-toastify/dist/index.css";

  //? deklarasi var
  const username = ref("");
  const password = ref("");
  let token = "";
  const store = useCounterStore();

  const { simpanUser, simpanToken } = store;

  const router = useRouter();

  let busy = ref(false);

  toast.info("Hello, Please Login First", {
    autoClose: 2000,
  });

  const endpoint = import.meta.env.VITE_ENDPOINT;

  const signIn = async () => {
    busy.value = !busy.value;
    try {
      console.log(endpoint);
      let x = {
        username: username.value,
        password: password.value,
      };

      let res = await axios.post(`${endpoint}/user/login`, x, {
        header: {
          "Content-Type": "application/json",
        },
      });

      const data = res.data?.data;
      const pesan = res.data?.pesan;
      const token = res.data?.token;
      // console.log(pesan);
      // console.log(data);
      // console.log(token);

      // notification
      toast.success(pesan, {
        autoClose: 2000,
      });
      // console.log(data.role);

      setTimeout(async () => {
        if (data.role == 0) {
          localStorage.setItem("authUser", true);
          localStorage.setItem("token", token);
          localStorage.setItem("tokenUser", token);
          localStorage.setItem("idUser", data.id);
          // await simpanUser(data, token);
          busy.value = !busy.value;
          router.push({ path: "/" });
        } else {
          localStorage.setItem("token", token);
          localStorage.setItem("authAdmin", true);
          // await simpanToken(token);
          busy.value = !busy.value;
          router.push({ path: "/admin" });
        }
      }, 1500);
    } catch (error) {
      console.log(error.response.data.error);
      console.log(error.response.data.pesan);
      toast.error(error.response.data.error || error.response.data.pesan, {
        autoClose: 2000,
      });

      setTimeout(() => {
        busy.value = !busy.value;
      }, 1500);
    }
  };
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .badan {
    font-family: "Quicksand", sans-serif;
    background-image: url(@/components/icons/bg-rapier.png);
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .badan::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: var(--bg-color);
    filter: opacity(0.7);
  }

  .container {
    max-width: 55%;
    height: 75%;
    background-color: var(--bg-color);
    border-radius: 40px;
    display: flex;
    align-content: center;
    overflow: hidden;
    z-index: 5;
  }

  .left {
    width: 50%;
    color: var(--secondary-color);
    background-image: url(@/components/icons/bg-rapier.png);
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 0;
  }

  .left p {
    font-weight: 700 !important;
    font-size: 2.1 rem !important;
  }

  .right {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--secondary-color);
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 70%;
    height: 85%;
    border-radius: 30px;
    border: 2px solid var(--main-color);
    background-color: var(--secondary-color);
  }

  h3 {
    color: var(--main-color);
    font-size: 2.0rem;
    font-weight: 700;
    margin-bottom: 3%;
  }
  h5 {
    color: var(--main-color);
    font-size: 1.5rem;
    font-weight: 700;
  }

  .inputbox {
    position: relative;
    min-width: 300px;
    margin-top: 35px;
  }

  .inputbox input {
    position: relative;
    min-width: 100%;
    height: 60px;
    padding: 25px 10px 10px;
    border: none;
    outline: none;
    font-size: 1.1rem;
    font-weight: 600;
    background-color: transparent;
    letter-spacing: 0.4px;
    color: var(--bg-color);
    z-index: 5;
  }

  .inputbox span {
    position: absolute;
    min-width: 100%;
    left: 0;
    bottom: 0;
    padding: 20px 10px 10px;
    color: var(--main-color);
    font-weight: 700;
    font-size: 1.3rem;
    pointer-events: none;
    letter-spacing: 0.5px;
    transition: all 0.5s ease-in-out;
  }

  .inputbox input:valid ~ span,
  .inputbox input:focus ~ span {
    transform: translateX(-10px) translateY(-36px);
    font-size: 1rem;
  }

  .inputbox i {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: var(--secondary-color);
    border-radius: 4px;
    border: 2px solid var(--main-color);
    transition: all 0.5s ease-in-out;
    pointer-events: none;
    color: var(--secondary-color);
  }

  .inputbox input:valid ~ i,
  .inputbox input:focus ~ i {
    height: 41px;
  }

  button {
    font-size: 20px;
    width: 300px;
    border: none;
    outline: none;
    background: var(--bg-color);
    color: var(--secondary-color);
    padding: 13px 0;
    margin-top: 35px;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
  }

  /* button:hover {
    background-color: var(--secondary-color);
    color: var(--bg-color);
  } */

  .links {
    width: 300px;
    display: flex;
    justify-content: space-between;
  }

  .links h5 {
    font-size: 1rem;
    font-weight: 700;
    margin-top: 20px;
    text-decoration: none;
    color: var(--bg-color);
    letter-spacing: 0.2px;
    transition: all 0.3s ease-in-out;
  }

  .links h5:hover {
    cursor: pointer;
    color: #0c0c0c;
  }

  .or {
    color: var(--secondary-color);
    font-weight: 700;
    margin-top: 20px;
    position: relative;
    min-width: 100%;
    text-align: center;
  }

  .or::before {
    content: "";
    position: absolute;
    left: 13%;
    bottom: 40%;
    height: 2px;
    min-width: 33%;
    background-color: var(--secondary-color);
  }

  .or::after {
    content: "";
    position: absolute;
    right: 13%;
    bottom: 40%;
    height: 2px;
    min-width: 33%;
    background-color: var(--secondary-color);
  }

  .button {
    font-size: 15px;
    min-width: 300px;
    border: none;
    outline: none;
    background: var(--bg-color);
    color: var(--secondary-color);
    padding: 15px 0;
    margin-top: 20px;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    position: relative;
  }

  ion-icon {
    font-size: 22px;
  }

  .button span {
    position: absolute;
    left: 6%;
    bottom: 17%;
  }

  .button:hover {
    background-color: var(--secondary-color);
    color: var(--bg-color);
  }
</style>
