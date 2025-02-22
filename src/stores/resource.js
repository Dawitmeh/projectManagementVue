import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axios/axiosClient";


export const useResourceStore = defineStore('resource', {
    state: () => ({
        equipments: [],
        currentEquipment: [],
        equipmentTypes: [],
        currentEquipmentType: [],
        materials: [],
        currentMaterial: [],
        humanresources: [],
        currentHr: [],
        isLoading: ref(false),
        notification: {
            show: false,
            type: null,
            message: null
        }
    }),
    getters: {
        //
    },
    actions: {
        notify({message, type}) {
            this.notification.show = true
            this.notification.type = type
            this.notification.message = message
            setTimeout(() => {
                this.notification.show = false
            }, 3000);
        },
        createEquipment(equipment) {
            this.isLoading = true
            return axiosClient.post('/equipments', equipment)
                .then((res) => {
                    this.equipments = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getEquipments() {
            this.isLoading = true
            return axiosClient.get('/equipments')
                .then((res) => {
                    this.equipments = res.data.data
                    this.isLoading = false
                })
        },
        getEquipment(id) {
            this.isLoading = true
            return axiosClient.get(`/equipments/${id}`)
                .then((res) => {
                    this.currentEquipment = res.data.data
                    this.isLoading = false
                })
        },
        updateEquipment(equipment) {
            this.isLoading = true
            return axiosClient.put(`/equipments/${equipment.id}`, equipment)
                .then((res) => {
                    this.currentEquipment = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        deleteEquipment(id) {
            this.isLoading = true
            return axiosClient.delete(`/equipments/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        },
        createMaterial(material) {
            this.isLoading = true
            return axiosClient.post('/material', material)
                .then((res) => {
                    this.materials = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getMaterials() {
            this.isLoading = true
            return axiosClient.get('/material')
                .then((res) => {
                    this.materials = res.data.data
                    this.isLoading = false
                })
        },
        getMaterial(id) {
            this.isLoading = true
            return axiosClient.get(`/material/${id}`)
                .then((res) => {
                    this.currentMaterial = res.data.data
                    this.isLoading = false
                })
        },
        updateMaterial(material) {
            this.isLoading = true
            return axiosClient.put(`/material/${material.id}`, material)
                .then((res) => {
                    this.currentEquipment = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        deleteMaterial(id) {
            this.isLoading = true
            return axiosClient.delete(`/material/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        },
        createEquipmentType(type) {
            this.isLoading = true
            return axiosClient.post('/equipmentType', type)
                .then((res) => {
                    this.equipmentTypes = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getEquipmentTypes() {
            this.isLoading = true
            return axiosClient.get('/equipmentType')
                .then((res) => {
                    this.equipmentTypes = res.data.data
                    this.isLoading = false
                })
        },
        getEquipmentType(id) {
            this.isLoading = true
            return axiosClient.get(`/equipmentType/${id}`)
                .then((res) => {
                    this.currentEquipmentType = res.data.data
                    this.isLoading = false
                })
        },
        updateEquipmentType(type) {
            this.isLoading = true
            return axiosClient.put(`/equipmentType/${type.id}`, type)
                .then((res) => {
                    this.currentEquipmentType = res.data.data
                    this.isLoading = false
                })
        },
        deleteEquipmentType(id) {
            this.isLoading = true
            return axiosClient.delete(`/equipmentType/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        },
        createHumanResource(resource) {
            this.isLoading = true
            return axiosClient.post('/humanresource', resource)
                .then((res) => {
                    this.humanresources = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getHumanResources() {
            this.isLoading = true
            return axiosClient.get('/humanresource')
                .then((res) => {
                    this.humanresources = res.data.data
                    this.isLoading = false
                })
        },
        getHumanResource(id) {
            this.isLoading = true
            return axiosClient.get(`/humanresource/${id}`)
                .then((res) => {
                    this.currentHr = res.data.data
                    this.isLoading = false
                })
        },
        updateHumanResource(resource) {
            this.isLoading = true
            return axiosClient.put(`/humanresource/${resource.id}`, resource)
                .then((res) => {
                    this.currentHr = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        deleteHumanResource(id) {
            this.isLoading = true
            return axiosClient.delete(`/humanresource/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        }
    }
})