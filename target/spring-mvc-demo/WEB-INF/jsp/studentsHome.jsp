<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Books Home</title>
    <link href="${pageContext.request.contextPath}/resources/css/uikit.css" rel="stylesheet">
    <script src="${pageContext.request.contextPath}/resources/js/jquery.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/uikit.js"></script>
</head>

<body>
<%@ include file="navbar.jsp" %>
<table class="uk-table uk-table-hover">
    <% %>
    <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Address</th>
    </tr>

    <c:forEach var="stu" items="${slist}">

        <tr>
            <td>${stu.id}</td>
            <td>${stu.firstName}</td>
            <td>${stu.lastName}</td>
            <td>${stu.address}</td>
        </tr>


        <%--            <td>--%>
        <%--                <a href=<%=contextPath%>/edit?id=${boo.id} class=" uk-icon-pencil" data-uk-tooltip="{pos:'top'}"--%>
        <%--                   title="com.sreekar.action.Edit"></a>--%>
        <%--                <a href=<%=contextPath%>/delete?id=${boo.id} class="uk-icon-close" data-uk-tooltip="{pos:'top'}"--%>
        <%--                   title="com.sreekar.action.Delete"></a>--%>
        <%--            </td>--%>


    </c:forEach>
</table>
</body>
</html>
