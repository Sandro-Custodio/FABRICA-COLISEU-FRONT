const validateRemarks = () =>{}
const saveConciliates = () => {
	if (!validateRemarks()){console.log("Preencha o campo de observação!");}
    if (!validateItems()){alert(message);}

	conciliates[0]["user"] = userId
    conciliates[0]["returned_remarks"] = btn_type === 'return' && remarks;

	if (btn_type === 'repproved'){
		let items = "";
		conciliates[0]["user_conciliate"] = bill.check_user.login;
		conciliates[0]["date_conciliate"] = checked_at.selectedDate;
		for (let o in conciliates){
			if (o.selected === true){
				items += o.bill_dif_type_id + ';'
				conciliates[0]["items"] = items;
			}
		}
		conciliates[0]["repproved_remarks"] = remarks;
		conciliates[0]["check_user_area_id"] = Application.application.loggedUser.area.id;
    }else
        if(btn_type === 'liberar'){
		    let total_contest = 0;
		    for (let con in conciliates){
		    	for (let i in con.bill_conciliate_items){
		    		if (parseInt(i.contestar) > 0){
		    			if (String(i.contestar).search(',')!==-1)
		    				total_contest += parseFloat(FaiconStringUtil.replace(i.contestar,'.','').replace(',','.'));
		    			else
		    				total_contest += parseFloat(i.contestar);
		    			i["status_id"] = 107;
		    		}
		    	}
		    }
		    conciliates[0]["total_appointed"] = lbl_apontado.replace(".","").replace(",",".");
		    if (total_contest > 0)
		    	conciliates[0]["total_contest"] = total_contest.toString();
	    }
	axios.post("save_conciliate", {conciliates, btn_type});
}




conciliates[i]["contestar"]
conciliates[i]["devido"]
conciliates[i]["pendente_llm"]
conciliates[i]["status_id"]
conciliates[i]["bill_conciliate_items"]
conciliates[i]["bill_conciliate_items"][j]["contestar"]
conciliates[i]["bill_conciliate_items"][j]["pendente_llm"]
conciliates[i]["bill_conciliate_items"][j]["devido"]
conciliates[i]["bill_conciliate_items"][j]["acao"]
conciliates[i]["bill_conciliate_items"][j]["justificativa"]
conciliates[i]["bill_conciliate_items"][j]["remarks"]
conciliates[i]["bill_conciliate_items"][j]["status_id"]


[0]["user"]  // Add user id
[0]["check_user_area_id"] //Não enviado
[0]["returned_remarks"] //Observação adicionada
[0]["total_contest"] // Não adicionada
[0]["total_appointed"] // Não adicionada
[0]["items"] // Não adicionada
[0]["repproved_remarks"] // Não adicionada
[0]["user_conciliate"] // Não adicionada
[0]["date_conciliate"] // Não adicionada
[0]["bill_id"] // ok


2
[
    {
      "id": null,
      "status_id": null,
      "bill_id": 47200,
      "bill_dif_type_id": 1,
      "base_fatura": null,
      "base_fisica": 0,
      "apontado": 0,
      "devido": null,
      "contestar": 0,
      "pendente_llm": null,
      "negado": null,
      "aceito": null,
      "pendente": null,
      "qtd_circuitos": 0,
      "inconsistencia": "Fatura Duplicada"
    }
  ]
