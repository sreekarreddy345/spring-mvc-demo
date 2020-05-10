<html lang="en">
<% String contextPath = application.getContextPath();%>
<head>
    <meta charset="UTF-8">
    <%--    <link type="text/css" href="CSS/uikit.css" rel="stylesheet"/>
        <link type="text/css" href="CSS/uikit.almost-flat.css" rel="stylesheet">
        <script type="text/javascript" src="js/core/dropdown.js"></script>--%>

    <link href="${pageContext.request.contextPath}/resources/css/uikit.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/css/uikit.almost-flat.css" rel="stylesheet">
    <script src="${pageContext.request.contextPath}/resources/js/jquery.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/uikit.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/core/dropdown.js"></script>
</head>
<body>

<nav class="uk-navbar">

    <a href=<%=contextPath%>/login class="uk-navbar-brand">Student Management</a>

    <ul class="uk-navbar-nav">
        <li class="uk-active"><a href=<%=contextPath%>/students>Students</a></li>
        <li class="uk-active"><a href=<%=contextPath%>/books>Books</a></li>
    </ul>

    <div class="uk-navbar-content uk-navbar-flip">

        <form method="get" action=<%=contextPath%>/search class="uk-form uk-margin-remove uk-display-inline-block">
            <input type="text" name="q" placeholder="Enter Keyword.....">
            <input type="submit" class="uk-button" value="Search">
        </form>
        <div class="uk-navbar-content uk-navbar-flip">
            <a class="uk-text-middle uk-text-bold  uk-text-success" href=<%=contextPath%>/display> ${user.userName}</a>
        </div>
        <div class="uk-navbar-content uk-navbar-flip">
            <form method="post" action=<%=contextPath%>/logout class="uk-form uk-margin-remove uk-display-inline-block">
                <input type="submit" class="uk-button" value="Logout"/>
            </form>
        </div>

    </div>
</nav>
<br/>
</body>
</html>