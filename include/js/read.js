$(document).ready(function() {

    function renderJSON2HTML(obj) {
        'use strict';
        var retValue = "";
        var skillScale = 5;
        var level = 0;
        for (var key in obj) {
            if (typeof obj[key] === 'object') {
                retValue += '<div class="' + key + '">';
                retValue += renderJSON2HTML(obj[key]);
                retValue += '</div>';
            }
            else {
                if(key == "level") {
                    retValue += '<div class="' + key + '">';
                    if(obj[key] > skillScale) {
                        level = skillScale;
                    }
                    else {
                        level = obj[key];
                    }
                    for(var i = 1; i <= level; i++) {
                        retValue += '<div class="point full_point"></div>';
                    }
                    for(var i = level; i < skillScale; i++) {
                        retValue += '<div class="point empty_point"></div>';
                    }
                    retValue += '</div>';
                }
                else {
                retValue += '<div class="' + key + '">' + obj[key] + "</div>";
                }
            }
        }
        return retValue;
    }




    function readHeader(json) {
        //Fullname
        var fullName = json.header.name.firstName + ' ' + json.header.name.lastName;
        //Document Title
        document.title = fullName;
        //Name
        $('.last_name').append(json.header.name.lastName);
        $('.first_name').append(json.header.name.firstName);
        //Photo
        $('.photo img').attr("src", json.header.image);
        $('.photo img').attr("title", fullName);
        //Objective
        $('.objective').append(json.header.objective);
        // //Born
        // $('.born').append(json.header.born);
        // //Citizenship
        // $('.citizenship').append(json.header.citizenship);
        // //Address
        // $('.country').append(json.header.address.country);
        // $('.city').append(json.header.address.city);
        // $('.zip').append(json.header.address.zip);
        // $('.street').append(json.header.address.street);
        // //Contact
        // $('.phone a').append(json.header.contact.phone);
        // $('.phone a').attr("href", "tel:" + json.header.contact.phone);
        var linkName = json.header.contact.linkedin.replace("https://", "");
        $('.linkedin a').append(linkName);
        $('.linkedin a').attr("href", json.header.contact.linkedin);
        var linkName = json.header.contact.homepage.replace("https://", "");
        $('.homepage a').append(linkName);
        $('.homepage a').attr("href", json.header.contact.homepage);
        $('.email a').append(json.header.contact.email);
        $('.email a').attr("href", "mailto:" + json.header.contact.email);
    }

    $.ajax({
        url: "data/cv.json",
        dataType: "text",
        success: function(data) {
            var json = $.parseJSON(data);

            readHeader(json);

            var education_steps = json.education.steps;
            var education       = renderJSON2HTML(education_steps);

            var job_steps = json.job.steps;
            var job       = renderJSON2HTML(job_steps);

            var skills_steps = json.skills.category;
            var skills       = renderJSON2HTML(skills_steps);

            var voluntary_steps = json.voluntary.steps;
            var voluntary       = renderJSON2HTML(voluntary_steps);

            $('#education .content').append(education);
            $('#job .content').append(job);
            $('#skill .content').append(skills);
            $('#voluntary .content').append(voluntary);
        }
    });

});
