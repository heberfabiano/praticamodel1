sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    'sap/ui/core/Fragment',
    'sap/m/MessageToast'
],
    function (Controller,
        JSONModel,
        Fragment,
        MessageToast) {
        "use strict";

        return Controller.extend("mentoria.fiori.ka.praticamodel1.controller.View", {

            onInit: function () {

                var oModel = new JSONModel("model/dataModel.json");
                this.getView().setModel(oModel);

            },

            onNew: function () {

                var oView = this.getView();
                var oNewDialog = this.getView().byId("idNewDialog");

                if (!oNewDialog) {
                    Fragment.load({
                        id: oView.getId(),
                        name: "mentoria.fiori.ka.praticamodel1.view.New",
                        type: "XML",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        oDialog.open();
                    })
                } else {
                    oNewDialog.open();
                }

            },

            onSave: function () {

                if (this.getView().byId("idNome").getValue() == '') {
                    MessageToast.show("Campo Nome é obrigatório")
                    return
                }

                if (this.getView().byId("idDtNasc").getValue() == "") {
                    MessageToast.show("Campo Dt. Nascimento é obrigatório")
                    return
                }

                if (!this.getView().byId("idDtNasc").isValidValue()) {
                    MessageToast.show("Data inválida")
                    return
                }

                if (this.getView().byId("idAltura").getValue() == '') {
                    MessageToast.show("Campo Altura é obrigatório")
                    return
                }

                var newLine = {
                    "nome": this.getView().byId("idNome").getValue(),
                    "dtNasc": this.getView().byId("idDtNasc").getDateValue(),
                    "sexo": this.getView().byId("idSexo").getSelectedKey(),
                    "altura": this.getView().byId("idAltura").getValue()
                };

                var dataTable = this.getView().getModel().getProperty("/dataTable")
                dataTable.push(newLine)

                this.getView().getModel().setProperty("/dataTable", dataTable)

                this.getView().byId("idNewDialog").close();

                this.getView().byId("idNome").setValue("")
                this.getView().byId("idDtNasc").setValue("")
                this.getView().byId("idSexo").setSelectedKey("M")
                this.getView().byId("idAltura").setValue("")

            },

            onClose: function () {
                this.getView().byId("idNewDialog").close();
                this.getView().byId("idNome").setValue("")
                this.getView().byId("idDtNasc").setValue("")
                this.getView().byId("idSexo").setSelectedKey("M")
                this.getView().byId("idAltura").setValue("")
            },

            formatIdade: function (dtNasc) {
                // Calculate the difference in milliseconds between the current date and the provided date of birth
                var diff_ms = Date.now() - dtNasc.getTime();

                // Create a new Date object representing the difference in milliseconds and store it in the variable age_dt (age Date object)
                var age_dt = new Date(diff_ms);

                // Calculate the absolute value of the difference in years between the age Date object and the year 1970 (UNIX epoch)
                return Math.abs(age_dt.getUTCFullYear() - 1970);

            },

            formatSexoText: function (sexo) {
                switch (sexo) {
                    case "M": return "Masculino"
                    case "F": return "Feminino"
                }
            },

            formatSexoIcon: function (sexo) {
                switch (sexo) {
                    case "M":
                        return "sap-icon://male"
                    case "F":
                        return "sap-icon://female"
                }
            },

            formatSexoState: function (sexo) {
                switch (sexo) {
                    case "M":
                        return "Indication05"
                    case "F":
                        return "Indication12"
                }
            }

        });

    });