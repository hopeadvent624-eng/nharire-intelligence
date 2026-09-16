def test_root_health(client):
    """Verify that root /health responds with 200 and expected metadata."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert "service" in data
    assert "version" in data
    assert "timestamp" in data


def test_api_v1_health(client):
    """Verify that /api/v1/health responds with database connectivity status."""
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] in ["ok", "degraded"]
    assert data["database_connected"] is True
    assert data["service"] == "Nharire Intelligence"
