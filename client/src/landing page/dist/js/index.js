$('#calc').on('input', function () {
    var amount = $(this).val();
    var months = $('#myRange').val();
    var i = 0;
    while (i < months) {
        amount = parseFloat(parseFloat((amount / 100) * 2.26));
        i++;
    }
    if (months > 1) {
        document.getElementById('calc_return').innerHTML = 'You will get <span>PKR ' + parseInt(amount) + '</span> after <span>' + (months) + ' months</span>';
    }
    else {
        document.getElementById('calc_return').innerHTML = 'You will get <span>PKR ' + parseInt(amount) + '</span> after <span>' + (months) + ' month</span>';
    }
    if (isNaN(amount)) {
        document.getElementById('calc_return').innerHTML = 'You will get <span>PKR ' + 0 + '</span> after <span>' + (0) + ' months</span>';
    }
});
$('#myRange').on('change', function () {
    var p_amount = $('#calc').val();
    var months = $(this).val();
    var i = 0;
    var amount = 0;
    while (i < months) {
        amount = amount + parseFloat(parseFloat(parseFloat(parseFloat(parseFloat(p_amount) + amount) / 100) * 2.26));
        i++;
        console.log(amount)
    }
    if (months > 1) {
        document.getElementById('calc_return').innerHTML = 'You will get <span>PKR ' + parseInt(amount) + '</span> after <span>' + (months) + ' months</span>';
    }
    else {
        document.getElementById('calc_return').innerHTML = 'You will get <span>PKR ' + parseInt(amount) + '</span> after <span>' + (months) + ' month</span>';
    }
    if (isNaN(amount)) {
        document.getElementById('calc_return').innerHTML = 'You will get <span>PKR ' + 0 + '</span> after <span>' + (0) + ' months</span>';
    }
});
$('input[type=range]').on('input', function (e) {
    var min = e.target.min,
        max = e.target.max,
        val = e.target.value;

    $(e.target).css({
        'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
    });
}).trigger('input');

$(document).ready(function () {
    // slick carousel
    $('.slider').slick({
        dots: false,
        loop: true,
        centerPadding: '0px',
        vertical: true,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
        verticalSwiping: true,
        centerMode: true,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    vertical: false,
                    verticalSwiping: false,
                }
            }
        ]
    });
    var maxHeight = -1;
    $('.slick-slide').each(function () {
        if ($(this).height() > maxHeight) {
            maxHeight = $(this).height();
        }
    });
    $('.slick-slide').each(function () {
        if ($(this).height() < maxHeight) {
            $(this).css('margin', Math.ceil((maxHeight - $(this).height()) / 2) + 'px 0');
        }
    });
});


$('.nav-item.nav-link').click(function () {
    $(this).siblings().removeClass('active');
});

var chart = Highcharts.chart('average_return', {
    chart: {
        backgroundColor: 'transparent',
        type: 'column'
    },
    title: {
        text: ''
    },
    xAxis: {
        categories: ['Property', 'Bank FD', 'Mutual Funds', 'Finja Invest']
    },
    yAxis: {
        gridLineDashStyle: 'longdash',
        min: 0,
        title: {
            text: ''
        }
    },
    plotOptions: {
        series: {
            pointWidth: 90,
        }
    },
    accessibility: {
        announceNewData: {
            enabled: true
        }
    },
    series: [{
        name: 'Returns in PKR',
        data: [{
            
            y: 2000,
            color: '#4ebe90'
        },
            
             {
            y: 2100,
            color: '#37B5E9'
        },
        {
            
            y: 2200,
            color: '#FEC902'
        },
        {
            y: 3600,
            color: '#F15E24'
        }]
    }]
});

$('#amount').on('input', function () {
    var ramount = $(this).val();
    chart.update({
        series: [{
            name: 'Returns in PKR',
            data: [{
                y: parseInt(ramount / 100 * 20),
                color: '#4ebe90'
            },

                {
                y: parseInt(ramount / 100 * 22),
                color: '#FEC902'
            }, {
                y: parseInt(ramount / 100 * 21),
                color: '#37B5E9'
            },
            {
                y: parseInt(ramount / 100 * 36),
                color: '#F15E24'
            }]
        }]
    });
});

Highcharts.chart('risk_factor', {
    chart: {
        backgroundColor: 'transparent',
        type: 'column'
    },
    title: {
        text: ''
    },
    xAxis: {
        categories: ['Bank FD', 'Mutual Funds', 'Commercial Real Estate', 'Finja Invest']
    },
    yAxis: {
        gridLineDashStyle: 'longdash',
        min: 0,
        title: {
            text: ''
        },
        labels: {
            enabled: false
        }
    },
    plotOptions: {
        series: {
            pointWidth: 90,
        }
    },
    series: [{
        name: 'Risk',
        data: [{
            y: 7,
            color: '#FEC902'
        }, {
            y: 12,
            color: '#37B5E9'
        }, {
            y: 18,
            color: '#4ebe90'
        },
        {
            y: 20,
            color: '#F15E24'
        }]
    }]
});