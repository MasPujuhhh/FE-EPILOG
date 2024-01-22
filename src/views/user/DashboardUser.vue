<template>
    <Navbar></Navbar>
    <div class="container">
        <div class="container-card">
            <!-- Left side -->
            <div class="left">
                <div class="left-header">
                    <h4>TODO</h4>
                    <h4>17 January 2024</h4>
                </div>
                <div class="left-content">
                    <div class="lcontent-head">
                        <h2>Lorem ipsum, dolor sit amet consectetur adipisicing.</h2>
                    </div>
                    <div class="lcontent-body">
                        <table class="table align-middle table-borderless">
                            <tbody>
                                <tr class="done">
																	<td style="width: 40px; height: 50px;"><i style="font-size: 17px;" class="bi bi-circle-fill"></i></td>
																	<td style="width: 500px;"><h5 style="text-decoration: line-through;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum!</h5></td>
																	<td style="width: 50px; padding-left: 5px;"><i style="font-size: 30px; font-weight: bold;" class="bi bi-check2-circle"></i></td>
																</tr>
                                <tr class="done">
																	<td style="width: 40px; height: 50px;"><i style="font-size: 17px;" class="bi bi-circle-fill"></i></td>
																	<td style="width: 500px;"><h5 style="text-decoration: line-through;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum!</h5></td>
																	<td style="width: 50px; padding-left: 5px;"><i style="font-size: 30px; font-weight: bold;" class="bi bi-check2-circle"></i></td>
																</tr>
                                <tr class="belum">
																	<td style="width: 40px; height: 50px;"><i style="font-size: 17px;" class="bi bi-circle-fill"></i></td>
																	<td style="width: 500px;"><h5 style="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum!</h5></td>
																	<td style="width: 50px;"><i style="font-size: 25px; font-weight: bold;" class="bi bi-circle"></i></td>
																</tr>
                                <tr class="belum">
																	<td style="width: 40px; height: 50px;"><i style="font-size: 17px;" class="bi bi-circle-fill"></i></td>
																	<td style="width: 500px;"><h5 style="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum!</h5></td>
																	<td style="width: 50px;"><i style="font-size: 25px; font-weight: bold;" class="bi bi-circle"></i></td>
																</tr>
                            </tbody>
                        </table>
                    </div>
                </div>
				<div class="left-bottom">
					<div style="height: 40px;" class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
  						<div class="progress-bar" style="width: 50%; height: 40px; background-color: #1d0066;">50%</div>
					</div>
					<div style="display: flex; flex-direction: row-reverse;" class="button">
						<button style="width: 200px; height: 40px;" type="button" class="btn btn-danger">Submit</button>
					</div>
                </div>
            </div>
            <!-- Right side -->
            <div class="right">
                 <div class="right-header">
                    <h4>17 January 2024</h4>
                    <h4>Masuk / Izin / Sakit</h4>
                    <h4>Menunggu Persetujuan</h4>
                    <h4>List Logbook</h4>
                </div>
                <div class="right-content">
                    <div class="atas-content">
                        <h4>Lorem ipsum dolor sit amet consectetur.</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime voluptatem doloremque aperiam vel, illo ut expedita molestiae. Earum voluptatem laboriosam deleniti quis molestias praesentium dolorum rem pariatur, qui iure officia?</p>
                    </div>
                </div>
                <div class="right-bottom">
					<div style="display: flex; flex-direction: row-reverse;" class="button">
						<button style="width: 200px; height: 40px;" type="button" class="btn btn-danger">Submit</button>
					</div>
                </div>


            </div>
        </div>

    </div>

</template>

<script setup>
import Navbar from '../../components/Navbar.vue';


</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.container {
    min-width: 100vw;
    min-height: 100vh;
    /* background-color: aqua; */
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    padding-top: 5rem;
}

.container-card {
    min-width: 95%;
    height: 90vh;
    /* background-color: blanchedalmond; */
    display: flex;
    gap: 30px;
}

.left {
    width: 40%;
    height: 100%;
    background-color: #D9D9D9;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
    gap: 10px;
}
.left-header {
    width: 80%;
    height: 5%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* background-color: aliceblue; */
}
.left-content {
    width: 80%;
    height: 80%;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    background-color: #FFFFFF;
}

.left-header h4 {
    font-size: 18px;
    /* font-weight: bold; */
}

.lcontent-head {
    width: 100%;
    height: 20%;
    /* background-color: aqua; */
    border-bottom: 1px solid black;
		padding-left: 10px;

}
.lcontent-body {
    width: 100%;
    height: 80%;
    /* background-color: aqua; */
    /* border-bottom: 1px solid black; */

}

.left-bottom {
    width: 80%;
    height: 15%;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    /* background-color: aliceblue; */
		gap: 10px;
}

.right {
    width: 60%;
    height: 100%;
    background-color: #D9D9D9;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
    gap: 5px;
}


.right-header {
    width: 90%;
    height: 5%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* background-color: aliceblue; */
}

.right-header h4 {
    font-size: 18px;
    /* font-weight: bold; */
}
.right-content {
    width: 90%;
    height: 80%;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    background-color: #FFFFFF;
}

.atas-content {
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    /* justify-content: space-between; */
    /* background-color: violet; */
    border-bottom: 1px solid black;
    gap: 3rem;
}

.atas-content h4{
   font-size: 25px;
   font-weight: bold;
}
.atas-content p{
   font-size: 18px;
   /* font-weight: bold; */
}

.right-bottom {
    width: 90%;
    height: 15%;
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
    /* justify-content: space-between; */
    /* background-color: violet; */
		/* gap: 10px; */
}

</style>