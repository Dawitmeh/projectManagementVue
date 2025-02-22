import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axios/axiosClient";
import axios from "axios";


export const useContractStore = defineStore('contracts', {
    state: () => ({
        contracts: [],
        currentContract: [],
        contractTypes: [],
        currentType: [],
        isLoading: ref(true),
        errMsg: [],
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
        createContract(contract) {
            this.isLoading = true
            return axiosClient.post('/contract', contract)
                .then((res) => {
                    this.contracts = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getContracts() {
            this.isLoading = true
            return axiosClient.get('/contract')
                .then((res) => {
                    this.contracts = res.data.data
                    this.isLoading = false
                })
        },
        getContract(id) {
            this.isLoading = true
            return axiosClient.get(`/contract/${id}`)
                .then((res) => {
                    this.currentContract = res.data.data
                    this.isLoading = false
                })
        },
        updateContract(contract) {
            this.isLoading = true
            return axiosClient.put(`/contract/${contract.id}`, contract)
                .then((res) => {
                    this.currentContract = res.data.data
                    this.isLoading = false
                })
        },
        deleteContract(id) {
            this.isLoading = true
            return axiosClient.delete(`/contract/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        },
        createContractType(type) {
            this.isLoading = true
            return axiosClient.post('/contract-type', type)
                .then((res) => {
                    this.contractTypes = res.data.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getContractTypes() {
            this.isLoading = true
            return axiosClient.get('/contract-type')
                .then((res) => {
                    this.contractTypes = res.data.data
                    this.isLoading = false
                })
        },
        getContractType(id) {
            this.isLoading = true
            return axiosClient.get(`/contract-type/${id}`)
                .then((res) => {
                    this.currentType = res.data.data
                    this.isLoading = false
                })
        },
        updateContractType(type) {
            this.isLoading = true
            return axiosClient.put(`/contract-type/${type.id}`, type)
                .then((res) => {
                    this.currentType = res.data.data
                    this.isLoading = false
                })
        },
        deleteContractType(id) {
            this.isLoading = true
            return axiosClient.delete(`/contract-type/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        }
    }
})