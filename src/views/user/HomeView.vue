<script setup>
  import Navbar from "@/components/Navbar.vue";
  import { onMounted, ref } from "vue";
  import axios from "axios";
  import { useCounterStore } from "@/stores/counter";
  import { storeToRefs } from "pinia";
  import { routerKey, useRouter } from "vue-router";

  const store = useCounterStore();
  const { id_produk } = storeToRefs(store);
  const { simpanDataProduk, simpanIdProduk } = store;

  let star = "bi bi-star-fill";
  let nilai = 4.5;
  const router = useRouter();

  let best = ref({});

  let produk = ref([]);

  let comment = ref({});

  const endpoint = import.meta.env.VITE_ENDPOINT;

  const viewProduk = async () => {
    try {
      let res = await axios.get(`${endpoint}/produk/top`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // console.log(res);
      const data = res.data?.data;
      // console.log(data);
      best.value = data[0];

      for (let i = 0; i < 5; i++) {
        produk.value.push(data[i]);
      }

      console.log(produk.value, "produk");
    } catch (error) {
      console.log(error);
    }
  };

  const viewDetail = async (id) => {
    try {
      await simpanIdProduk(id);
      router.push({ path: "detail-product" });
    } catch (error) {
      console.log(error);
    }
  };

  const viewComment = async () => {
    try {
      let res = await axios.get(`${endpoint}/produk/comment`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = res.data?.data[0];

      comment.value = data;

      console.log(res, "ini comment");
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(() => {
    viewProduk();
    viewComment();
    // console.log(produk.value);
  });
</script>

<template>
  <Navbar></Navbar>
  <!-- hero section -->
  <div class="hero-section">
    <div class="section">
      <div class="hero-left">
        <h2
          style="
            color: var(--main-color);
            font-weight: 700;
            font-size: 2.7rem;
            margin-bottom: 1.25rem;
          "
        >
          Bring you happiness<br />through a piece of cake
        </h2>
        <p style="font-size: 1.4rem; font-weight: 500; margin-bottom: 2rem">
          we make different type of cakes, chocolate, <br />
          soft cookies, cheesecakes pie or anything<br />you want.
        </p>
        <div class="hero-button">
          <button @click="viewDetail(best.id)" class="hero-order">
            Order Now
          </button>
          <button @click="$router.push('/list-product')" class="hero-menu">
            See All Menus
          </button>
        </div>
      </div>
      <div class="hero-right">
        <div class="hero-img">
          <img src="src/components/icons/hero-img.png" alt="" />
        </div>
      </div>
    </div>
  </div>
  <!-- best seller section -->
  <div class="bs-section">
    <div class="best-section">
      <div class="bs-title">
        <h1
          style="
            text-align: end;
            color: var(--main-color);
            font-weight: 700;
            font-size: 3rem;
          "
        >
          Try Our Best selling
        </h1>
        <div></div>
        <p style="font-size: 1.4rem; font-weight: 600; margin-top: 10px">
          Here's our best creations that everyone loves. Lightness and <br />
          sweetness of the cake make you want more and more. Start <br />
          from cake, bread and other creations.
        </p>
      </div>
      <div class="bs-item">
        <!-- items -->
        <div class="cake-item">
          <div @click="viewDetail(item.id)" v-for="item in produk" class="item">
            <img
              style="width: 250px; border-radius: 15px"
              :src="'http://localhost:8001/assets/img/' + item.gambar_produk"
              alt="keren"
            />
            <h3 style="font-size: 1.5rem">
              {{ item.nama_produk }}
            </h3>
            <div class="rating">
              <!-- <ion-icon name="star"></ion-icon> -->
              <i
                v-for="i in 5"
                :v-if="
                  i <= item.bintang
                    ? (star = 'bi bi-star-fill')
                    : (star = 'bi bi-star')
                "
                style="font-size: 1.2rem; margin-right: 2px; color: #ffa903"
                :class="star"
              ></i>
              <span style="font-size: 1rem; font-weight: 600; margin-left: 5px">
                {{ item.bintang }} | ({{ item.jumlah_penilaian }} rating)</span
              >
              <h3 style="font-size: 1rem">{{ item.jumlah_terjual }} terjual</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-evenly">
        <button class="bs-button" @click="$router.push('/list-product')">
          View More
        </button>
      </div>
    </div>
  </div>
  <div id="serve" class="service-section">
    <div class="service-container">
      <div class="service1" style="margin-bottom: 10rem">
        <div class="title-service">
          <h3
            style="
              font-size: 3rem;
              font-weight: 600;
              color: var(--main-color);
              margin-bottom: 2rem;
            "
          >
            We Bake for you <br />
            Fresh From the oven
          </h3>
          <p style="font-size: 1.5rem; font-weight: 500">
            We use quality materials that we get directly from farmers. <br />
            our backers are experienced people in the food sector. so <br />
            that the products we produce are guaranteed quality and <br />
            taste. it's so delicious, you have to try it!
          </p>
        </div>
        <img src="src/components/icons/service-image.png" alt="" />
      </div>
      <div class="service1">
        <img src="src/components/icons/service-image.png" alt="" />
        <div class="title-service">
          <h3
            style="
              font-size: 3rem;
              font-weight: 600;
              color: var(--main-color);
              margin-bottom: 2rem;
            "
          >
            Come and choose <br />
            your favourites
          </h3>
          <p style="font-size: 1.5rem; font-weight: 500">
            Try to come to our shop directly to enjoy the delicious taste<br />
            of the cake thath just came out of the oven. While enjoying it<br />with
            a cupof coffee or tea in our very convinient shop. Very<br />suitable
            for chatting, meeting with your team.
          </p>
        </div>
      </div>
    </div>
  </div>
  <div id="contact" class="order-section">
    <div class="order-container">
      <h1
        style="
          font-size: 2.9rem;
          font-weight: 700;
          color: var(--main-color);
          margin-bottom: 1rem;
        "
      >
        For Custom Cake Orders
      </h1>
      <p style="font-size: 1.3rem; margin-bottom: 1.9rem">
        Please Visit our nearest store or chat us on (10 AM to 7 PM) <br />
        to place your orders.
      </p>
      <button @click="$router.push('/chat')" class="contact-button">
        Contact Us Now
      </button>
    </div>
  </div>
  <div class="quotes-section">
    <div class="quotes-container">
      <div class="quote">
        <span
          style="
            display: inline-block;
            background-color: #fff;
            border-radius: 10px;
            padding: 0.3rem 0.6rem;
            font-size: 0.8rem;
            font-weight: 600;
            margin-bottom: 0.4rem;
          "
          >Review</span
        >
        <p style="font-size: 2.4rem; font-weight: 700; margin-bottom: 2rem">
          {{ comment.komentar }}
        </p>
        <img src="src/components/icons/quotes-img.png" alt="" />
        <h3 style="font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem">
          {{ comment.email }}
        </h3>
        <h5 style="font-size: 1.2rem">Customer</h5>
      </div>
    </div>
  </div>
  <div class="footer-section">
    <div class="footer-container">
      <h4 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 1rem">
        &#169;
        <span style="font-weight: 600; color: var(--main-color)">Happy</span>
        Bakery. All right reserved.
      </h4>
      <div class="footer-icons">
        <a href="#"><ion-icon name="logo-facebook"></ion-icon></a>
        <a href="#"><ion-icon name="logo-twitter"></ion-icon></a>
        <a href="#"><ion-icon name="logo-instagram"></ion-icon></a>
        <a href="#"><ion-icon name="logo-github"></ion-icon></a>
        <a href="#"><ion-icon name="logo-linkedin"></ion-icon></a>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* hero section */
  .hero-section {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: radial-gradient(
      circle 400px at 6.8% 8.3%,
      rgba(255, 244, 169, 1) 0%,
      rgba(255, 244, 234, 1) 100.2%
    );
  }

  .section {
    width: 80%;
    height: 700px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8rem;
  }

  .hero-button {
    display: flex;
    gap: 3rem;
  }

  .hero-order {
    padding: 0.6rem 1.8rem;
    width: 10rem;
    height: 3rem;
    border: none;
    background-color: var(--main-color);
    color: #fff;
    border-radius: 10px;
    font-weight: 600;
    transition: all 0.3s ease-in-out;
    opacity: 1;
  }

  .hero-order:hover {
    opacity: 0.7;
  }

  .hero-menu {
    width: 10rem;
    height: 3rem;
    background-color: #fff;
    color: var(--main-color);
    font-weight: 600;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
    border: 1px solid var(--main-color);
  }

  .hero-menu:hover {
    opacity: 0.7;
  }

  /* best selling section */

  .bs-section {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff4ea;
  }

  .best-section {
    width: 80%;
    min-height: 700px;
    margin-bottom: 13rem;
  }

  .bs-title div {
    height: 100px;
    width: 2px;
    background-color: #96705f;
  }

  .bs-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 7rem;
  }

  .cake-item {
    display: flex;
    justify-content: space-between;
  }

  .item {
    transition: all 0.4s ease-in-out;
  }

  .item:hover {
    cursor: pointer;
    transform: scale(110%);
  }

  .cake-item > a {
    color: #000;
    text-decoration: none;
  }

  .bs-button {
    width: 200px;
    padding: 0.6rem 1.9rem;
    background-color: #fff;
    font-size: 1.25rem;
    font-weight: 600;
    border: 1px solid var(--main-color);
    border-radius: 10px;
    color: var(--main-color);
    margin-top: 6rem;
    transition: all 0.4s ease-in-out;
  }

  .bs-button:hover {
    background-color: var(--main-color);
    color: #fff;
  }

  /* service section */
  .service-section {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff4ea;
  }

  .service-container {
    width: 80%;
    min-height: 700px;
    margin-bottom: 10rem;
  }

  .service1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* order section */
  .order-section {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff4ea;
  }

  .order-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #fff;
    width: 80%;
    min-height: 410px;
    margin-bottom: 11rem;
    border-radius: 2rem;
  }

  .contact-button {
    width: 180px;
    padding: 0.6rem;
    background-color: var(--main-color);
    font-size: 1rem;
    font-weight: 600;
    border-radius: 10px;
    color: #fff;
    transition: all 0.4s ease-in-out;
  }

  .contact-button:hover {
    background-color: #fff;
    color: var(--main-color);
  }

  /* quotes section */

  .quotes-section {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff4ea;
  }

  .quotes-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 80%;
    min-height: 410px;
    margin-bottom: 10rem;
  }

  /* footer section */

  .footer-section {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--secondary-color);
    box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.1);
  }

  .footer-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: var(--secondary-color);
    width: 80%;
    min-height: 125px;
  }

  .footer-icons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.7rem;
  }

  .footer-icons a ion-icon {
    color: #6e6e6e;
    font-size: 1.4rem;
    transition: all 0.4s ease-in-out;
  }

  .footer-icons a ion-icon:hover {
    color: var(--main-color);
  }
</style>
