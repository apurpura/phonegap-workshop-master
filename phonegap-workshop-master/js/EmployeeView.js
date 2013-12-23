var EmployeeView = function(employee) {

    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('click', '.add-location-btn', this.addLocation);
        this.el.on('click', '.change-pic-btn', this.changePicture);
    };

    this.render = function() {
        this.el.html(EmployeeView.template(employee));
        return this;
    };

    this.changePicture = function(event) {
        event.preventDefault();
        if (!navigator.camera) {
            app.showAlert("Camera API not supported", "Error");
            return;
        }
        var options =   {   quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
            encodingType: 0     // 0=JPG 1=PNG
        };

        navigator.camera.getPicture(
            function(imageData) {
                $('.employee-image', this.el).attr('src', "data:image/jpeg;base64," + imageData);
            },
            function() {
                app.showAlert('Error taking picture', 'Error');
            },
            options);

        return false;
    };

    this.addLocation = function(event) {
        event.preventDefault();
        console.log('addLocation');
        if(navigator.geolocation){
            // timeout at 60000 milliseconds (60 seconds)
            var options = {
                enableHighAccuracy: true,
                timeout: 60000,
                maximumAge: 10000
            };
            navigator.geolocation.getCurrentPosition(
                onSuccess,onError,
                options);
        }else{
            showAlert('Sorry, browser does not support geolocation!', 'Browser unsupported');
        }

        return false;};

    function onSuccess (position) {
        $('.location', this.el).html(position.coords.latitude + ',' + position.coords.longitude);
    }

    function onError (err) {
        if(err.code == 1) {
            showAlert('Location Error: Position is unavailable!', 'Location Error');
        }else if( err.code == 2) {
            showAlert('Location Error: Position is unavailable!', 'Location Error');
        }
        else{
            showAlert('Location Error: Error getting your location!', 'Location Error');
        }
    }


    function showAlert (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    }

    this.initialize();

}

EmployeeView.template = Handlebars.compile($("#employee-tpl").html());