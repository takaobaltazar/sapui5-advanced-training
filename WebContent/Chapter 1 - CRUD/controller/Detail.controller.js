sap.ui.define ([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller, MessageBox) {
	"use strict";
	return Controller.extend("sapui5.advanced.training.template.controller.Detail", {
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			this._sPath = oEvent.getParameter("arguments").employeeID;
			this.getView().bindElement({
				path: "/" + this._sPath,
				model: "hanademoModel"
			});
		},
		onSave : function() {
			var sName = this.getView().byId("idName").getValue();
			var sSalary = this.getView().byId("idSalary").getValue();
			var oHanaModel = this.getView().getModel("hanademoModel");
			var oProp = { "Name" : sName, "Salary" : sSalary};
			oHanaModel.update("/" + this._sPath, oProp, {
				success : function() {
					sap.m.MessageBox.success("Successfull Update!");
				},
				error : function() {
					sap.m.MessageBox.error("Error Update!");
				}
			});
		},
		onOpenDeleteDialog : function() {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("sapui5.advanced.training.template.fragment.ConfirmMsg", this);
				this.getView().addDependent(this._oDialog);
			}
			this._oDialog.open();
		},
		onDelete : function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var oHanaModel = this.getView().getModel("hanademoModel");
			oHanaModel.remove("/" + this._sPath, {
				success : function() {
					oRouter.navTo("overview");
				},
				error : function() {
					MessageBox.error("Error Delete!");
				}
			});
		},
		onCloseConfirm : function() {
			this._oDialog.close();
		}
	});
});
