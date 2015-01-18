/*jslint browser: true, devel: true, sloppy: true, plusplus: true*/
/*global m */
m.prototype.feeds = [

    {
        'feedName': 'HN',
        'feedUrl': 'https://news.ycombinator.com/rss',
        'webUrl': 'https://news.ycombinator.com/',
        'favIcon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAkUlEQVR4nGP8n8bwn4ECwESJZhoZMPM/A8PM/wzfVXSxihM04NemEgYGBgYGZnU3hJh3MYocXgPYtvZCaKNwhBiUDZNDBiwYIgwMDD8XRTCwx62A28wmYwoRw6KWEWc01p5iYJAxhbCfnGZgaDbDqgxnLPw6txIrm3gXMDAgQj2dEaeSwZiQSAT4w4AeLqDYAACDty1YDHeZYQAAAABJRU5ErkJggg==',
        'bgColor': '#FF8737'
    },

    {
        'feedName': 'Liliputing',
        'feedUrl': 'http://feeds.feedburner.com/Liliputing?format=xml',
        'webUrl': 'http://liliputing.com/',
        'favIcon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAbvAAAG7wBureguwAAACF0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgNC4w6iYndQAAAeRJREFUeJylkz9rU2EUxn/vfe+9TdEW1FoxAaNLIINjpItjPkASShxFcHLwCzgIIn4CXRwclY66h2RoBmMR3AtCYm36R5vG3tw/732PQ1pIm1SQPuPhnN85z4FHiQgXkfJ9f+22ZvWyp7BKj4tiwc8AAgKuo/gVJnwPwkfGmHeTADeOY15ch/s35rHLd/A9jfJ91NwlEItYQYvhY3eXhxubUxe4ANcU3EwTyGhYWIJ4BPEfQEOaQsZj0Z+bacEFSC2kA4MkwO8dzMFP3MUcThiT2gBPC8H27vmASCBAMb+1hT3aR19ZRo8Eu71JlMZYY4iOZj/RBRhaiEUw+3ugwB8cEO3tcBgLI4EFZ7zkXMChAz8sjAAFyCjCKLAaXIHQwjAFxi2nAZlMxn8+iMguXSVJDSKCKAXHMCXgAENtcd3RCvDhFKBcLnfXP3ewt/KslO4RhiGIjKcn5GnNt40vT5VSfRF5dVJXIuLV6/XXjUbjcbFYpFQqkSTJlFelFFprWq0WvV7vWb/ff3kCAKBWq601m83VQqFANpvFGDMFcRwHrTWdTodcLve23W4/UZNZqFar71ut1oMgCGa//PgSx3HwPI98Pv9GnQmTrlQqX7vd7l2tNf8KmoiQJMmns4D/lnOhaeAvU6/cFwrl8IcAAAAASUVORK5CYII=',
        'bgColor': '#CECECE',
        'textColor': '#000000'
    },

    {
        'feedName': 'CNX',
        'feedUrl': 'http://feeds.feedburner.com/cnx-software/blog?format=xml',
        'webUrl': 'http://www.cnx-software.com/',
        'favIcon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB9klEQVR4nKWTP0tbURjGfzm3KEqg4ZLKtbdkqYM6JGST2E9QoXFwMB2baj9AMlbwMyS4BeqW0rhF7qRDlgSHSkCEoFAzNBCQYAT/JNx7z9vJtreNtrTPet7zvr/3Oc8JiYjwH1IPHV5eXpLL5R5sELqPoFqtcnR0hOu6DIdD8vk8pmn+meDs7AvZ7FuazSau62IYBmNjY2xubqK1vp9ARCgWi7RaLWzbRrQmvbyMbdsUCgUGgwGnJ6dUKp9QhhEk6PV6LC6+oFGvo5QiFovxfmODcDjM1tYWdwPsZzbz8/MBgkcAnU4HrTUigohgWRZ7e3s0Gg2UUpimSb/fx7Is4vEElmXR7XZ/EJyfn5NOv8J1XXzfp1arcXBwgFKKtbU1otEoiXicbreL73tMT08HV5ibnSWZTFLd3f1OopRifHycUqnE6ckJnw8P8TyPwWBIZnU12OCpbRONRqnVariuSyQS4ebmBt/z0FqjDAOlFO12m/V368z95EMgBzuVCo8jERzHYWJiksnJCUKhENfX15TLZT6Wy/hak0qlRufg5dISAPV6Hd/zuLq6on9xwYftbbLZNzyfmQlcvnuegFqtlhwfH8uTqSl5ncmI4ziysrIiWutfS0VEZGSU9/f3SSQSdL52uB3csrCw8FsCR3rwL3rwN/6NvgGfvQ8DkkNkhAAAAABJRU5ErkJggg==',
        'bgColor': '#000000',
        'textColor': '#FFFFFF'
    },

    {
        'feedName': 'hubski',
        'feedUrl': 'http://hubski.com/rss?id=2',
        'webUrl': 'http://hubski.com/global?id=3',
        'favIcon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACjklEQVR4nI2Tz2vUVxTFP+9933x/6GQwsZNgCaQSg7QLNSA0uBJNFGqoWFqoLrUFhaZL9R9wIepOdBcRpVCS4EJRg1gqQUhLq1JoN20JgUJ0EnAyozPzne9773bx1ZigC8/63sM995yjAC5PTkuatkCE94JSRFHMiS/3K3Vp8o68qNXfMaOoLC2hlKa8sQt5B3mx1IFx1gNgM0srbYIo4igmzVqc+f4YXjznxn9EK411Gc4LcZRgCgZnPTpNm3jv8M4yMjTI8a9HCQ14LxTCAlEU4cWTxAW+/WqUkaFBnGsDIOIxoNBKI+Lo7+sFoBAaTDvk5NmLiBfKPT3ExgDQ39fLg9/+WJFhXj8Frbl5/yECNFptArHs+HgL7TRj7uki+ITpmV9pNFp49FoC5zyttmOx1kBrRZamHD6wl4HNfQD8PTfP9Vs/UwkaVJdrmCAgVjmBFhHKHRHffLGfo4dGqFar7Pl0cGUZYGBzH6UkoFGvM3bkc44e2kez0XxzQVepyEe9H7JQWcQ5R/hK72porQFhU3cZgMxmOYEC/pxb4NkPN6hUl+ns7OL+7CN2bv8ErQMAnlWWeP4yJUrWcfHaJFoHlIolRAR1/uqUiPfYLGPD+hjB87yWnze0bSuZdfz+1z8Yo9lYWk8rs9SbGUEQECfJ6yc6vG1zcHgYgIm7D1iq1ZmemcV7YUPXBxSTiM927wLgytRtgmBdLi0PhOAF/p3/L0+ltWgPZ0+Nce70d3ibkWYOyGdEqTc2RlGMdw4xIfdmH/PTL08wYQQaFiqLeUy0opG2GZ+8Tds54ih5FR+NCUweClMwFAsdK8xhGHLhygRKKXq6yytlClc5ExiNgrV1NqbwloWrYW22ps7/AwEIHeTrVJFsAAAAAElFTkSuQmCC',
        'bgColor': '#00B5B1'
    },

    {
        'feedName': 'DN',
        'feedUrl': 'https://news.layervault.com/?format=rss',
        'webUrl': 'https://news.layervault.com/',
        'favIcon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABLElEQVR4nKWTTU4CQRBGX3fPn8NgUAE1xpgQQ1gYTmFc6HG4BYkrL2bc4cLEpYmwYhCa6W4XhBnQAYzUrir9ffWq0iWcc4I9wltNur3X+N8G3d6gBmK0FwHAZPSO0ZPdwjDh4Ojyt4HNZpj5104D6QXlBEmzvVO8RvKzkH6+rY0g/Yikcc34Y4A180IYVYmPr/Dqt/1nAKF8eX7zQFA5wUWH+UMhFz2MnmCNLoyVnxN0AXAOAJ0OMbN0jcCPa38fwQsrCFWUpQo2iksNhPSQ0q7kCoCodoGzZoUsLDfQ6ZBsNgagetpBBYvPGVab5QTOZhoIlp3ieivfx3KBW0JLm037zmid1FsLNOkhlY9UPkJsvjMHGugL55w4u3+KGp07uU1QEvblsT0V+57zN4FmWE2JmgtuAAAAAElFTkSuQmCC',
        'bgColor': '#8AB0EA'
    },

    {
        'feedName': '/r/JavaScript',
        'feedUrl': 'http://www.reddit.com/r/javascript/.rss',
        'webUrl': 'http://www.reddit.com/',
        'favIcon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACaklEQVR4nKWT3UsTYBSHH7e5Zpu5+cVGH6ZTE8QYQSIqyzIpJWgRYYYGoViZyPRCCyK6STOIoMg/ICLICd4EgVLYh0hJojE3sylZ2YxNNtzaZDrfLkaz/LiofnAuDuf3Ppz3PeeNsXmF4D8kA/DMB//psCYpLgLYSFKpjGDAz70bbSSlatHvyWby/SiSJT/arH2Un6wBQLIZIBxe5t3QAPEJao6ajmG32lnxzdF19zYjr/uivnUAmSyWrUoFAFMTVo4cr0K7I4/65quo0/Korm3g8ImaVf9awJzzK44P47i/Oxnoe8K2xFT8gSA5uXs5da4JmVzBcmgx6o951P9GPH38AE2KjphYBT/cM2Trd7M9NZkEtQaXy4Xj8xc+zXwjeWc2YmkRj8tJeeVZDPvzodHcKqYdk8JYXCg6O9qFL+AXKysr68IX8IvOjnZhLC4U045J0WhuFTavENKDpWXXhwZfUnn6DLV1dch7LGA0QnER7EqDwVdgMCDX6ym6cBG1JhGLxUKcchuGohIkupwCbPYJTCZT5FIqFWSkg1IZyZXKSK5SAWAymbDZJ9DlFETqNq8QTeaWDdveLJrMLWJwKiBsXiEkWxSCWbePsZHh6Mt2W3qwWq0sLCxgtVrptvREa2Mjw8y6fb+NUUDV+RbarrVxufkSJaVl6DPS6e3tJRwOI5VKqaioAGDgWT8379yn/krn6hhtXiE880HcLicPu26REh9L2aEDZGZmIpfLCYVCOBwO+p+/wOVborqhleQUHRD5C1HAL01/nGB89C0e1xzLoUVkcgWaFC25hnwysnL+WLooYO02/o1+AscvMnLhCOElAAAAAElFTkSuQmCC',
        'bgColor': '#CEE3F8'
    },

    {
        'feedName': '/r/PHP',
        'feedUrl': 'http://www.reddit.com/r/php/.rss',
        'webUrl': 'http://www.reddit.com/',
        'favIcon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACaklEQVR4nKWT3UsTYBSHH7e5Zpu5+cVGH6ZTE8QYQSIqyzIpJWgRYYYGoViZyPRCCyK6STOIoMg/ICLICd4EgVLYh0hJojE3sylZ2YxNNtzaZDrfLkaz/LiofnAuDuf3Ppz3PeeNsXmF4D8kA/DMB//psCYpLgLYSFKpjGDAz70bbSSlatHvyWby/SiSJT/arH2Un6wBQLIZIBxe5t3QAPEJao6ajmG32lnxzdF19zYjr/uivnUAmSyWrUoFAFMTVo4cr0K7I4/65quo0/Korm3g8ImaVf9awJzzK44P47i/Oxnoe8K2xFT8gSA5uXs5da4JmVzBcmgx6o951P9GPH38AE2KjphYBT/cM2Trd7M9NZkEtQaXy4Xj8xc+zXwjeWc2YmkRj8tJeeVZDPvzodHcKqYdk8JYXCg6O9qFL+AXKysr68IX8IvOjnZhLC4U045J0WhuFTavENKDpWXXhwZfUnn6DLV1dch7LGA0QnER7EqDwVdgMCDX6ym6cBG1JhGLxUKcchuGohIkupwCbPYJTCZT5FIqFWSkg1IZyZXKSK5SAWAymbDZJ9DlFETqNq8QTeaWDdveLJrMLWJwKiBsXiEkWxSCWbePsZHh6Mt2W3qwWq0sLCxgtVrptvREa2Mjw8y6fb+NUUDV+RbarrVxufkSJaVl6DPS6e3tJRwOI5VKqaioAGDgWT8379yn/krn6hhtXiE880HcLicPu26REh9L2aEDZGZmIpfLCYVCOBwO+p+/wOVborqhleQUHRD5C1HAL01/nGB89C0e1xzLoUVkcgWaFC25hnwysnL+WLooYO02/o1+AscvMnLhCOElAAAAAElFTkSuQmCC',
        'bgColor': '#9998CC'
    },

    {
        'feedName': '/r/CSS',
        'feedUrl': 'http://www.reddit.com/r/css/.rss',
        'webUrl': 'http://www.reddit.com/',
        'favIcon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACaklEQVR4nKWT3UsTYBSHH7e5Zpu5+cVGH6ZTE8QYQSIqyzIpJWgRYYYGoViZyPRCCyK6STOIoMg/ICLICd4EgVLYh0hJojE3sylZ2YxNNtzaZDrfLkaz/LiofnAuDuf3Ppz3PeeNsXmF4D8kA/DMB//psCYpLgLYSFKpjGDAz70bbSSlatHvyWby/SiSJT/arH2Un6wBQLIZIBxe5t3QAPEJao6ajmG32lnxzdF19zYjr/uivnUAmSyWrUoFAFMTVo4cr0K7I4/65quo0/Korm3g8ImaVf9awJzzK44P47i/Oxnoe8K2xFT8gSA5uXs5da4JmVzBcmgx6o951P9GPH38AE2KjphYBT/cM2Trd7M9NZkEtQaXy4Xj8xc+zXwjeWc2YmkRj8tJeeVZDPvzodHcKqYdk8JYXCg6O9qFL+AXKysr68IX8IvOjnZhLC4U045J0WhuFTavENKDpWXXhwZfUnn6DLV1dch7LGA0QnER7EqDwVdgMCDX6ym6cBG1JhGLxUKcchuGohIkupwCbPYJTCZT5FIqFWSkg1IZyZXKSK5SAWAymbDZJ9DlFETqNq8QTeaWDdveLJrMLWJwKiBsXiEkWxSCWbePsZHh6Mt2W3qwWq0sLCxgtVrptvREa2Mjw8y6fb+NUUDV+RbarrVxufkSJaVl6DPS6e3tJRwOI5VKqaioAGDgWT8379yn/krn6hhtXiE880HcLicPu26REh9L2aEDZGZmIpfLCYVCOBwO+p+/wOVborqhleQUHRD5C1HAL01/nGB89C0e1xzLoUVkcgWaFC25hnwysnL+WLooYO02/o1+AscvMnLhCOElAAAAAElFTkSuQmCC',
        'bgColor': '#666666',
        'textColor': '#FFFFFF'
    },

    {
        'feedName': 'Trusted Reviews',
        'feedUrl': 'http://www.trustedreviews.com/feeds',
        'webUrl': 'http://www.trustedreciews.com/',
        'favIcon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABRklEQVR4nJ2TP0jDUBDGf6+NSy0kgw5dWsfikEzdtN1DyVgogti1/gEnpyIi6FJwEMTVwUknkS5O0rFTIxQXIXVxcDAZnKSNw2sbIk1bc8s7vrv77u47nvAr6R3gAtD4v9WEX0n7MQrH5ioA7g9cvg0js6yMwFDFtJCmANiez+nrYEajZBQBCoCuChr5JAAPH0O6no9lWRzs7wGQSwlIAc4LODY834YJtCVo5BMTsOsNMAydYrEYbre+Kd81HW6OAEgwzz7f4cSEZhU6jxIz6+EJZhP0odeWvmNDoRxM02svQLCak8nLKpS2AnxEugBBFo5bYez+fOLO1+DbC3YH6d+dRRMYKpRWhDwdQN+WAo5Up1AOrjGNwMokeNpQ2M7+CbWuAjHr11ITZmkwHtuxA6xZBXM3lCb8SvqLeD8RkCscxqx1gdovamBRq+BUBfkAAAAASUVORK5CYII=',
        'bgColor': '#FF5625',
        'textColor': '#FFFFFF'
    },

    {
        'feedName': '/r/ShutupAndTakeMyMoney',
        'feedUrl': 'http://www.reddit.com/r/shutupandtakemymoney/.rss',
        'webUrl': 'http://www.reddit.com/r/shutupandtakemymoney',
        'favIcon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACaklEQVR4nKWT3UsTYBSHH7e5Zpu5+cVGH6ZTE8QYQSIqyzIpJWgRYYYGoViZyPRCCyK6STOIoMg/ICLICd4EgVLYh0hJojE3sylZ2YxNNtzaZDrfLkaz/LiofnAuDuf3Ppz3PeeNsXmF4D8kA/DMB//psCYpLgLYSFKpjGDAz70bbSSlatHvyWby/SiSJT/arH2Un6wBQLIZIBxe5t3QAPEJao6ajmG32lnxzdF19zYjr/uivnUAmSyWrUoFAFMTVo4cr0K7I4/65quo0/Korm3g8ImaVf9awJzzK44P47i/Oxnoe8K2xFT8gSA5uXs5da4JmVzBcmgx6o951P9GPH38AE2KjphYBT/cM2Trd7M9NZkEtQaXy4Xj8xc+zXwjeWc2YmkRj8tJeeVZDPvzodHcKqYdk8JYXCg6O9qFL+AXKysr68IX8IvOjnZhLC4U045J0WhuFTavENKDpWXXhwZfUnn6DLV1dch7LGA0QnER7EqDwVdgMCDX6ym6cBG1JhGLxUKcchuGohIkupwCbPYJTCZT5FIqFWSkg1IZyZXKSK5SAWAymbDZJ9DlFETqNq8QTeaWDdveLJrMLWJwKiBsXiEkWxSCWbePsZHh6Mt2W3qwWq0sLCxgtVrptvREa2Mjw8y6fb+NUUDV+RbarrVxufkSJaVl6DPS6e3tJRwOI5VKqaioAGDgWT8379yn/krn6hhtXiE880HcLicPu26REh9L2aEDZGZmIpfLCYVCOBwO+p+/wOVborqhleQUHRD5C1HAL01/nGB89C0e1xzLoUVkcgWaFC25hnwysnL+WLooYO02/o1+AscvMnLhCOElAAAAAElFTkSuQmCC',
        'bgColor': '#A4BD99'
    },

    {
        'feedName': 'Bit Tech',
        'feedUrl': 'http://feeds.feedburner.com/bit-tech/hardware',
        'webUrl': 'http://www.bit-tech.net/',
        'favIcon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC6klEQVR4nIWTf2jUdRjHX8/3vrvrbtu5nXjTuXRqls5yOrPm+gEaiAsZImfRHyZk6Yz1Rz/AH/OPLLUgMRVGU7BCBW1SkjhFbCSNnCHbiV07S8vTmM3cebpuN+7X5+mP2U1r0PPfw/O8388Dz+sRVVVGiOuRG/REejFZw9gJfh6cPA7LYf2nz743MUY5dqCNQ02tXLl4jZy1wLgJfpatqiWwahFOlzOnkX82iPcP0LhiO2e/CaJiRloKVJg26yG2fbEOf+noYYNsJktD3SY62y+AjKzNeShMmV7O3rat5Bd6sABadh+ns/3H/xUDiMBv4QjN7x8cylPJtNZVvMbNP6KIJRijWJbcnaaAICKoKqpDNRHB5XJxNLwHu7vzEpl0mpk1E4n2xhlTWki4qwdvkRuvz4NYwmA8hcMWxpR66Q7+zp1oAlHhbFsQK3KpB3eBTSqZxlfiIdYXx+l24Csp4HY0js/vId+bRyqZ5nZfguUNS/j40Eb+Sg7wS+gKdiI+SGBlHc88PxdEUKMc+fwk+3Z9xbpt9VQ/NxsRIdbXz5rARmbMqWDOs49yPPQp3uICOHn4O/01dE1b9rRqdclS/fZohwbP/KT1yxo1nc7oi082aP3iRlVVXb7gLY3eiGnTpv06f/xL+uXeE2rXLKzC7XHTtGUfA7EEZZPG0tEWpHrebNQYmr5+D1Vo2d3Kzd5b+PxF/HD6PIn+JBVVU7HzCz0AhLsuU1TsZeIjZezc+hkr6gMEv+/m3Td34HTkMZhIUlE5degStvBUbRXTZk1BjDGazRgWlr+Mr3QU67evYf3Kj3i85jGWvrIIuctGZ3uI/Z8cYXPz24wqLqRy3nREZBjlc6cv8M4LH3DrTowHnC6MMaQy6RxADsuBMy+PTCbLhl2vE3i19v5fALjcfZUP32gmdO5nsmpy01XBEovyh8tYu2M1VU/PGCbz3++sqpw/E6bjVBfXI3+iBvzjfTyxYCZz51di24770P4brnpFogeS20MAAAAASUVORK5CYII=',
        'bgColor': '#350D4F',
        'textColor': '#FFFFFF'
    },

    {
        'feedName': 'Geek Alerts',
        'feedUrl': 'http://feeds.feedburner.com/geekalerts',
        'webUrl': 'http://www.geekalerts.com/',
        'favIcon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADL0lEQVR4nG2Tb0icBRzHP3c+z52X95ze1fQ8zU27QeN2FohTYuloTrcor1EEQYQQMSkYraJFIFQUFO7FMhZF28tqGIyNWuA0ISy8dmsbNu5e7CynMU9vnnf23HN/H3+9CN2Evq9+rz7w4/v5WkREuCfxeByXy4WmaYyMjDA/P09/fz99fX38X5SNwzRNJiYmGBsbo7u7G5vNxvT0NG1tbWiahmEYjI6O0traSjAYRFXVrYBEIkEkEqGurg7DMBARnE4nXV1dtLS0MDw8zNraGgBerxefzweAdQPQ4Gtg184ghmEQCATQNI1sNouu68zNzRGLxejp6SEQCFBfX7/5wiYgnVtme6eC1aIQDofx+/2EQiG8Xi8zMzN4vV4aGxtpb2/HIpZNgEVEpFQw+eLySxSbxtlXPk2z+3E8HjcAZbNMcilJNBYluPsRpm6eZ8UZYWD3SWyKA0REfr72vbz1i1O+XtwrxfWMiIh8d/6s9B3eJ10HHpOPRz6QUsGUT84dlwOf2mQo7pGryxdERMQKEP5zFO1+kyalF9XiYnJqnM/PnMSlbuOd14fQVA9nvvmMHQ07yKQsGCkrf2QuIgLWvFHk1nIMu2rHbdsJZZi8chFPjYc3j73NoScP8urga9xOLuBzNFM2FFJLRRb1mxRLRRRz3eSfVJ6yCSXJgkDizt+43JWs3kkTuRKhoJtk9BWqnTU4VI1SMUshb7IuJorDUYmtUE8m9RcLzgiPVr9Mb+eznPj2DezjLlRTI5m7xZ5eP06HG724is3uIJdSUK02rNYKC50PhViMqsSNn0jmYjz/1AscOfwecfM6MfNXmjtqORJ6n0vXL6BUFUgk02yv7EBRK/5rIbm0IgPHD8nRyWr5MtorejEhIiJZvSCp9KqIiNyYm5GOdz3Sd8oi+084ZH559m4LD9R6GHz6I1anAkRmpzj1+3NcXTyHcl+eCvs6o9NfcezsQezVKZZvC6/sGebBbS13Rdqw6lrkBqcnhliwX0KtKuOu9GHk8swnE+QMcKAx2PMhL+4/utXEe+eZTReYvPwj4dkfiC78hpHXqamqpX3XEzyzdwB/08Nb5vwvI/OByfHPXQ4AAAAASUVORK5CYII=',
        'bgColor': '#418226',
        'textColor': '#FFFFFF'
    }






];