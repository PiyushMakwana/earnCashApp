$("#logoutbtn").on("click", function(){
	localStorage.removeItem('ecaJwtToken');
	localStorage.clear();
	mainView.router.load({
        url: 'index.html'
    });
});