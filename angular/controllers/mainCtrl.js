app.controller("mainCtrl", function ($scope, $timeout, $window, $location) {


    $scope.alert = null;

    $scope.groups = [

        {
            city: "Vancouver",
            groups: [
                {id: 0, name: "Vancouver Rental - Brazil", url: "https://chat.whatsapp.com/IFxqCtwmLwqGJwb3YyPXVp"},
                {id: 1, name: "Vancouver Rental - India", url: "https://chat.whatsapp.com/HKdBBsPri8fJLifqjmVral"},
                {id: 2, name: "Vancouver Rental - China", url: "https://chat.whatsapp.com/BzPQWHc8miTGdF7oxqlOLy"},
                {id: 3, name: "Vancouver Rental - Philippines", url: "https://chat.whatsapp.com/BPaSeqj5cR0FSvDUVC5ge5"}
            ]
        },
        {
            city: "Toronto",
            groups: [
                {id: 0, name: "Toronto Rental - Brazil", url: "https://chat.whatsapp.com/DfLBBgUAkh0EBLGKbORdpQ"},
                {id: 1, name: "Toronto Rental - India", url: "https://chat.whatsapp.com/JNoUPDcI03pKk6E3gqwqLs"},
                {id: 2, name: "Toronto Rental - China", url: "https://chat.whatsapp.com/KTSPjPKtZub5ZbhDVPUiTI"},
                {id: 3, name: "Toronto Rental - Philippines", url: "https://chat.whatsapp.com/KKWfxQEWmirBo4tQp0XM7A"}
            ]
        }


    ];

    $scope.cities = [
        {id: 0, name: "Vancouver"},
        {id: 1, name: "Toronto"},
    ];


    $scope.selectedGroups = $scope.groups[0].groups; //default vancouver

    $scope.user = {
        group: $scope.selectedGroups[1], //vancouver
        city: $scope.cities[0], //vancouver
        email: "",
    };

    /*#############################################################|
    |                        FIREBASE
    *##############################################################*/

    /* Connect to firebase =========================================== */
// Initialize Firebase
    var config = {
        apiKey: "AIzaSyB3iOzD2pUfXtMkeQtl8H6_B1DJ8raD8TI",
        authDomain: "rentalmoose-46113.firebaseapp.com",
        databaseURL: "https://rentalmoose-46113.firebaseio.com",
        projectId: "rentalmoose-46113",
        storageBucket: "rentalmoose-46113.appspot.com",
        messagingSenderId: "1069422962488"
    };
    firebase.initializeApp(config);


//Connecting to database
    const fbDatabase = firebase.database();


    /*#############################################################|
    |                        FUNCTIONS
    *##############################################################*/

    $scope.loadCities = function (userCity) {

        let filtered = $scope.groups.filter((group) => {

            if (group.city == userCity.name) {
                return group;
            }

        });

        $scope.selectedGroups = filtered[0].groups;
    };

    $scope.joinGroup = function () {

        /* Validate user information =========================================== */

        if ($scope.user.email == "") {
            $scope.alert = {
                type: "danger",
                message: "Please, fill your e-mail address to proceed"
            };
            return false;
        }


        /* Save user information =========================================== */

        let userCity = $scope.user.city.name;

        //save user info in database

        fbDatabase.ref(`leads/${userCity.toLowerCase()}`).push($scope.user);

        $scope.alert = {
            type: "success",
            message: "You're being redirected to the selected group"
        };

        $timeout(() => {

            console.log($scope.user);


            $window.location.href = $scope.user.group.url;


        }, 1000);


    }


});