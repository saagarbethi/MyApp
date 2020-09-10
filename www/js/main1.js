jQuery(document).ready(function($){
	//open the lateral panel
	$('.cd-btn1').on('click', function(event){
		event.preventDefault();
		$('.cd-panel1').addClass('is-visible');
	});
	//close the lateral panel
	$('.cd-panel1').on('click', function(event){
		if( $(event.target).is('.cd-panel1') || $(event.target).is('.cd-panel-close1') || $(event.target).is('.viewclk>td') || $(event.target).is('.viewclk>td>a') || $(event.target).is('.btnwdth')  ) { 
			$('.cd-panel1').removeClass('is-visible');
			event.preventDefault();
		}
	});
});