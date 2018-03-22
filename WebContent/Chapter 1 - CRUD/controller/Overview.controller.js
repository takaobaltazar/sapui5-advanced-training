sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
],function(Controller, JSONModel) {
	Controller.extend("sapui5.advanced.training.template.controller.Overview", {
		onOpenDialogEntry : function() {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("sapui5.advanced.training.template.fragment.AddEntry", this);
				this.getView().addDependent(this._oDialog);
			}
			this._oDialog.open();
			
			// Create a local model , for storing the value of name and salary
			var oModel = new JSONModel({
				Name : null,
				Salary : null
			});
			this.getView().setModel(oModel, "createEntry");
		},

		onCreateEntry : function(oEvent) {
			var that = this;
			var oTable = this.getView().byId("idTable");
			var oModel = this.getView().getModel("createEntry");
			var oProp = oModel.getProperty("/"); 
			oProp.Employee_ID = parseInt(Math.random() * 1000, 10);
			
			var oHanaModel = this.getView().getModel("hanademoModel");
			oHanaModel.create("/Employees", oProp, {
				success : function(oData) {
					that.onClose();
					oTable.getModel("hanademoModel").refresh(true);
				},
				error : function(oData) {
					sap.m.MessageToast.show("Error on creating an entry");
				}
			});
		},

		onClose: function() {
			this._oDialog.close();
		},

		onItemPressTable: function (oEvent) {
			var oListItem = oEvent.getParameter("listItem");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail", {
				employeeID : oListItem.getBindingContext("hanademoModel").getPath().slice(1)
			});
		}		
	});
});
