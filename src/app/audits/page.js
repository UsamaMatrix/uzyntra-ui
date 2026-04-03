"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { formatTimestamp } from "@/lib/format";
import PageHeader from "@/components/PageHeader";
import SectionCard from "@/components/SectionCard";
import EmptyState from "@/components/EmptyState";

const DEFAULT_LIMIT = 10;

export default function AuditsPage() {
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({
    actor: "",
    action: "",
    target: "",
    limit: DEFAULT_LIMIT,
    offset: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function load(nextFilters = filters) {
    setLoading(true);
    setError("");

    try {
      const res = await api.getAudits(nextFilters.limit, nextFilters.offset);
      let items = res?.data?.items || [];

      if (nextFilters.actor) {
        items = items.filter((item) =>
          String(item.actor || "").toLowerCase().includes(nextFilters.actor.toLowerCase())
        );
      }

      if (nextFilters.action) {
        items = items.filter((item) =>
          String(item.action || "").toLowerCase().includes(nextFilters.action.toLowerCase())
        );
      }

      if (nextFilters.target) {
        items = items.filter((item) =>
          String(item.target || "").toLowerCase().includes(nextFilters.target.toLowerCase())
        );
      }

      setRows(items);
      setSelected((current) => {
        if (!items.length) return null;
        if (!current) return items[0];
        return items.find((item) => item.timestamp === current.timestamp && item.action === current.action) || items[0];
      });
    } catch (err) {
      setError(err.message || "Failed to load audit entries");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(filters);
  }, []);

  function updateFilter(key, value) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function applyFilters() {
    const next = {
      ...filters,
      offset: 0,
    };
    setFilters(next);
    load(next);
  }

  function resetFilters() {
    const next = {
      actor: "",
      action: "",
      target: "",
      limit: DEFAULT_LIMIT,
      offset: 0,
    };
    setFilters(next);
    load(next);
  }

  function nextPage() {
    const next = {
      ...filters,
      offset: Number(filters.offset || 0) + Number(filters.limit || DEFAULT_LIMIT),
    };
    setFilters(next);
    load(next);
  }

  function prevPage() {
    const next = {
      ...filters,
      offset: Math.max(0, Number(filters.offset || 0) - Number(filters.limit || DEFAULT_LIMIT)),
    };
    setFilters(next);
    load(next);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Trail"
        subtitle="Review operator actions, administrative changes, and response history across the control plane"
        actions={
          <button onClick={() => load(filters)} className="btn-primary">
            Refresh
          </button>
        }
      />

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <SectionCard
        title="Filters"
        right={
          <div className="flex gap-2">
            <button onClick={resetFilters} className="btn-secondary">
              Reset
            </button>
            <button onClick={applyFilters} className="btn-primary">
              Search
            </button>
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Field
            label="Actor"
            value={filters.actor}
            onChange={(e) => updateFilter("actor", e.target.value)}
            placeholder="ui-operator"
          />
          <Field
            label="Action"
            value={filters.action}
            onChange={(e) => updateFilter("action", e.target.value)}
            placeholder="manual_block_ip"
          />
          <Field
            label="Target"
            value={filters.target}
            onChange={(e) => updateFilter("target", e.target.value)}
            placeholder="127.0.0.1"
          />
          <SelectField
            label="Page size"
            value={filters.limit}
            onChange={(e) => updateFilter("limit", Number(e.target.value))}
            options={[10, 20, 50]}
          />
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SectionCard
          title="Audit Results"
          right={
            <div className="text-xs text-slate-500">
              {loading ? "Loading..." : `${rows.length} item(s)`}
            </div>
          }
        >
          {rows.length === 0 ? (
            <EmptyState title="No audits found" text="Try changing filters or loading more recent records." />
          ) : (
            <>
              <div className="table-wrap">
                <table className="table-ui">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Actor</th>
                      <th>Action</th>
                      <th>Target</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, idx) => {
                      const active =
                        selected &&
                        selected.timestamp === row.timestamp &&
                        selected.action === row.action &&
                        selected.target === row.target;

                      return (
                        <tr
                          key={`${row.timestamp}-${row.action}-${idx}`}
                          onClick={() => setSelected(row)}
                          className={active ? "bg-slate-50 cursor-pointer" : "cursor-pointer"}
                        >
                          <td>{formatTimestamp(row.timestamp)}</td>
                          <td>{row.actor}</td>
                          <td>{row.action}</td>
                          <td>{row.target}</td>
                          <td>
                            <ResultBadge result={row.result} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-500">
                  Offset: {filters.offset} • Limit: {filters.limit}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={prevPage}
                    disabled={Number(filters.offset) <= 0 || loading}
                    className="btn-secondary disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextPage}
                    disabled={loading || rows.length < Number(filters.limit)}
                    className="btn-secondary disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </SectionCard>

        <SectionCard title="Audit Details">
          {!selected ? (
            <EmptyState title="No audit selected" text="Select an audit entry to inspect details." />
          ) : (
            <div className="space-y-5">
              <DetailItem label="Timestamp" value={formatTimestamp(selected.timestamp)} />
              <DetailItem label="Actor" value={selected.actor} />
              <DetailItem label="Action" value={selected.action} />
              <DetailItem label="Target" value={selected.target} />
              <DetailItem label="Result" value={selected.result} />
              <DetailItem label="Details" value={selected.details} />
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <input {...props} className="input-ui" />
    </label>
  );
}

function SelectField({ label, options, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <select value={value} onChange={onChange} className="select-ui">
        {options.map((option) => (
          <option key={String(option)} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 break-all text-sm text-slate-900">{value || "—"}</p>
    </div>
  );
}

function ResultBadge({ result }) {
  const value = String(result || "").toLowerCase();

  let classes = "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
  if (value.includes("applied") || value.includes("updated") || value.includes("removed")) {
    classes = "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200";
  } else if (value.includes("not_found")) {
    classes = "bg-amber-100 text-amber-700 ring-1 ring-amber-200";
  }

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${classes}`}>
      {result}
    </span>
  );
}
