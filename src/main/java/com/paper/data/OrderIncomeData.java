package com.paper.data;

public class OrderIncomeData {
    /** 商家名字*/
    private String businessName;

    /** 订单总数*/
    private Integer orderNumber;

    /** 订单总收入*/
    private Double orderIncome;

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public Integer getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(Integer orderNumber) {
        this.orderNumber = orderNumber;
    }

    public Double getOrderIncome() {
        return orderIncome;
    }

    public void setOrderIncome(Double orderIncome) {
        this.orderIncome = orderIncome;
    }
}
