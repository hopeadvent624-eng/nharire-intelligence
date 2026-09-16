.PHONY: help install dev dev-backend dev-frontend test migrate migrate-create clean

PYTHON_VENV = backend/.venv
PYTHON_BIN = $(PYTHON_VENV)/bin/python3
PIP_BIN = $(PYTHON_VENV)/bin/pip
UVICORN_BIN = $(PYTHON_VENV)/bin/uvicorn
ALEMBIC_BIN = $(PYTHON_VENV)/bin/alembic
PYTEST_BIN = $(PYTHON_VENV)/bin/pytest

help:
	@echo "========================================================================"
	@echo " Nharire Intelligence - Developer Workflow Commands (Phase A Foundation)"
	@echo "========================================================================"
	@echo " make install        - Set up backend venv, install Python & JS dependencies"
	@echo " make dev-backend    - Start FastAPI backend with hot reload on port 8000"
	@echo " make dev-frontend   - Start Next.js frontend on port 3000"
	@echo " make test           - Run backend test suite with pytest"
	@echo " make migrate        - Apply Alembic migrations to database"
	@echo " make migrate-create - Generate new Alembic revision based on SQLAlchemy models"
	@echo " make clean          - Remove temporary Python caches, test artifacts, and build files"
	@echo "========================================================================"

install:
	@echo "==> Setting up Python virtual environment..."
	python3 -m venv $(PYTHON_VENV)
	$(PIP_BIN) install --upgrade pip
	$(PIP_BIN) install -r backend/requirements.txt
	@echo "==> Setting up Frontend dependencies..."
	cd frontend && npm install
	@echo "==> Installation complete."

dev-backend:
	@echo "==> Starting FastAPI backend on http://0.0.0.0:8000 (docs at /docs)..."
	cd backend && ../$(UVICORN_BIN) app.main:app --host 0.0.0.0 --port 8000 --reload

dev-frontend:
	@echo "==> Starting Next.js frontend on http://localhost:3000..."
	cd frontend && npm run dev

test:
	@echo "==> Running backend test suite..."
	$(PYTEST_BIN) backend

migrate:
	@echo "==> Applying database migrations..."
	cd backend && ../$(ALEMBIC_BIN) upgrade head

migrate-create:
	@read -p "Enter migration description: " desc; \
	cd backend && ../$(ALEMBIC_BIN) revision --autogenerate -m "$$desc"

clean:
	@echo "==> Cleaning cache directories..."
	rm -rf backend/__pycache__ backend/app/__pycache__ backend/app/**/__pycache__
	rm -rf backend/.pytest_cache .pytest_cache
	rm -f backend/nharire_dev.db
