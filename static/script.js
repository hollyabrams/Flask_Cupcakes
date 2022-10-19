
"use strict";

const BASE_URL = "http://127.0.0.1:5000/api";

let $cupcakeList = $("#cupcake-list");
let $cupcakeForm = $("#cupcake-form");

async function getCupcakes() {
  const res = await axios.get(`${BASE_URL}/cupcakes`);

  for (let cupcake of res.data.cupcakes) {
    let $new_cupcake = $(
      `<div data-id=${cupcake.id}>
      <li>${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating} <button class="delete">X</button></li>
      <img class="cupcake-img" src="${cupcake.image}">
      </div>`
    );
    $new_cupcake.appendTo($cupcakeList);
  }
}

getCupcakes();

$cupcakeForm.on("submit", async function (e) {
  e.preventDefault();

  let flavor = $("#flavor").val();
  let size = $("#size").val();
  let rating = $("#rating").val();
  let image = $("#image").val();

  console.log(flavor, size, rating);

  const res = await axios.post(`${BASE_URL}/cupcakes`, {
    // flavor: flavor,
    // size: size,
    // rating: rating,
    // image: image,

    //this is a shorthand of what's above
    flavor,
    size,
    rating,
    image,
  });
  console.log(res);
  $cupcakeForm.trigger("reset");
});

$("#cupcake-list").on("click", ".delete", async function (e) {
  e.preventDefault();

  let $cupcake = $(e.target).closest("div");
  let cupcakeId = $cupcake.attr("data-id");

  await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
  $cupcake.remove();
});
