var app = {




    initialize: function() {
        var self = this;
        this.homeTpl = Handlebars.compile($("#home-tpl").html());
        this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
        this.store = new WebSqlStore(function() {
            //showAlert('Store Initialized', 'Info');
            $('body').html(new HomeView(self.store).render().el);
        });
        $('.search-key').on('keyup', $.proxy(this.findByName, this));

    }

};

app.initialize();

function showAlert (message, title) {
    if (navigator.notification) {
        navigator.notification.alert(message, null, title, 'OK');
    } else {
        alert(title ? (title + ": " + message) : message);
    }}