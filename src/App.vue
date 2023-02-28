<script setup>
import { ref, onMounted } from 'vue'
import { doc, setDoc } from 'firebase/firestore'
import { VueRecaptcha } from 'vue-recaptcha'

const props = defineProps({
  db: Object
})

const collectionName = 'geotagging-stpeterstvm-org'
const captchaSiteKey = import.meta.env.VITE_APP_RECAPTCHA_SITE_KEY

let nameRef = ref('')
let directoryIdRef = ref('')
let phoneNumberRef = ref('')

let isCaptchaSuccess = ref(false)
let error = ref('')
let isSubmitted = ref(false)

let latitude = ref(8.498515)
let longitude = ref(76.950596)

let mapRef = ref(null)
let marker = ref(null)
let map = ref(null)

let handleCaptchaSuccess = function () {
  isCaptchaSuccess.value = true
}

let onSubmit = async function (event) {
  event.preventDefault()
  event.stopPropagation()

  const nameVal = nameRef.value.value
  const directoryIdVal = directoryIdRef.value.value
  const phoneNumberVal = phoneNumberRef.value.value

  if (isCaptchaSuccess.value) {
    await setDoc(doc(props.db, collectionName, directoryIdVal), {
      name: nameVal,
      directoryId: directoryIdVal,
      phoneNumber: phoneNumberVal,
      coords: {
        latitude: latitude.value,
        longitude: longitude.value
      }
    })
    isSubmitted.value = true
  } else {
    error.value = 'Unable to submit. Please refresh and try again'
  }

  return false
}

let setMarker = () => {
  if (marker.value !== null) {
    marker.value.setVisible(false)
    marker.value.setMap(null)
    marker.value = null
  }
  if (map.value !== null) {
    marker.value = new window.google.maps.Marker({
      position: {
        lat: latitude.value,
        lng: longitude.value
      },
      map: map.value
    })
    map.value.setCenter({
      lat: latitude.value,
      lng: longitude.value
    })
  }
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    latitude.value = position.coords.latitude
    longitude.value = position.coords.longitude
    setMarker()
  })
}

onMounted(() => {
  if (!window.google || !window.google.maps) {
    const googleMapScript = document.createElement('script')
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_APP_GOOGLE_MAPS_API
    }`
    window.document.body.appendChild(googleMapScript)
    googleMapScript.addEventListener('load', () => {
      map.value = new window.google.maps.Map(mapRef.value, {
        zoom: 15,
        center: new window.google.maps.LatLng(latitude.value, longitude.value),
        mapTypeControl: false
      })

      map.value.addListener('click', (mapsMouseEvent) => {
        latitude.value = mapsMouseEvent.latLng.lat()
        longitude.value = mapsMouseEvent.latLng.lng()
        setMarker()
      })

      setMarker()
    })
  }
})
</script>

<template>
  <main id="main" class="container">
    <div class="row">
      <div class="col-xs-12 col-lg-offset-3 col-lg-6">
        <div class="text-center">
          <h1 id="title">Geotagging Form</h1>
          <template v-if="isSubmitted">
            <p id="description" class="description text-center">Thank you for your response.</p>
          </template>
          <template v-else-if="isError">
            <p id="description" class="description text-center">{{ error }}</p>
          </template>
          <template v-else>
            <p id="description" class="description text-center">TODO:: Add description</p>
          </template>
        </div>
        <form id="geotagging-form" @submit="onSubmit" v-if="!isSubmitted" method="post">
          <fieldset>
            <label for="name">
              Name *
              <input
                class=""
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name (required)"
                ref="nameRef"
                required
              />
            </label>
          </fieldset>
          <fieldset>
            <label for="directory_id">
              Directory Id *
              <input
                class=""
                type="text"
                id="directory_id"
                name="directory_id"
                placeholder="Enter your Directory Id (required)"
                ref="directoryIdRef"
                required
              />
            </label>
          </fieldset>
          <fieldset>
            <label for="directory_id">
              Contact Number
              <input
                class=""
                type="text"
                id="contact_no"
                name="contact_no"
                placeholder="Enter your Contact Number"
                ref="phoneNumberRef"
                required
              />
            </label>
          </fieldset>
          <fieldset>
            <div class="map" ref="mapRef"></div>
          </fieldset>
          <fieldset>
            <VueRecaptcha
              :sitekey="captchaSiteKey"
              :load-recaptcha-script="true"
              @verify="handleCaptchaSuccess"
              class="reCaptcha"
            ></VueRecaptcha>
          </fieldset>
          <button id="submit" type="submit" class="btn">Submit</button>
        </form>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
#geotagging-form {
  label {
    display: block;
    margin-bottom: 2%;
    font-size: 1.1em;
    font-weight: 300;
    color: var(--white);
    letter-spacing: 0.5px;
  }

  input::-webkit-input-placeholder {
    color: transparent !important;
  }
  input::-moz-placeholder {
    color: transparent !important;
  }
  input:-ms-input-placeholder {
    color: transparent !important;
  }
  input:-moz-placeholder {
    color: transparent !important;
  }

  input {
    display: block;
    width: 100%;
    overflow: hidden;
    outline: none;
    border: 2px solid var(--grey);
    margin-top: 1.5%;
    padding: 0 0 5px 0;
    background: transparent;
    border: none;
    outline: none;
    border-bottom: 2px solid var(--white);
    font-size: 1.1em;
    font-weight: 300;
    color: var(--green);

    &:focus {
      border-color: var(--green);
    }
  }

  .btn {
    display: inline-block;
    position: relative;
    width: 100%;
    margin: 3% 0 0 0;
    height: 45px;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    border: 3px solid var(--green);
    border-radius: 0;
    font-weight: 500;
    font-size: 1.2em;
    color: var(--green);
    text-align: center;
    background: none;
    transition: color 0.25s ease;

    &:after {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      background-color: var(--green);
      transform-origin: left;
      transition: width 0.5s ease;
      z-index: -1;
    }
    &:hover {
      color: var(--background);

      &:after {
        width: 100%;
      }
    }
  }

  fieldset {
    margin: 5% 0 0 0;
  }

  .map {
    height: 250px;
  }

  .reCaptcha {
    :first-child {
      margin: 0 auto;
    }
  }
}
</style>
